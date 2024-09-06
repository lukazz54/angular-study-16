import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { Observable, filter, from, map, of, switchMap, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todo-list';

  @Input() public projectName!: string;
  @Output() public outputEvent = new EventEmitter<string>;

  public students: Array<SchoolData> = [];
  public teachers: Array<SchoolData> = [];

  private ages = of(20, 30, 40, 50, 60, 70);

  private studentUserId = '2';

  // o operador from transforma um Array de Observable em um objeto iteravel. Ou seja, conseguimos pegar as propriedades daquela classe
  private peoplesDatas = from([
    {name: 'Marcos Junior', age:20, profession: 'Software Developer'},
    {name: 'Lucas Santos', age:29, profession: 'Software Developer Pleno'},
    {name: 'Jorge', age:35, profession: 'Scrum Master'},
    {name: 'Sebastiao ', age:35, profession: 'Scrum Master'},
    {name: 'Carla', age:35, profession: 'Scrum Master'},
  ])
  //o operador zip agrupa um array de observables e seu valor pode ser acessado pelo index do array
  private zipSchoolResponses$ = zip(
    this.getStudentsDatas(),
    this.getTeachersDatas()
  )

  constructor(private schoolService: SchoolService){}

  ngOnInit(): void {
    this.handleFindStudentsById();
  }

  public handleEmitEvent(): void {
    this.outputEvent.emit(this.projectName)
  }

  public handleFindStudentsById(): void {
    this.getStudentsDatas()
    .pipe(
      //o switchmap, eh ultilizado para lidar com Observables que emitem outros Observables
      //vc alterana para o Observable mais recente e descata o anterior
      switchMap((students) => this.findStudentsById(
        students, this.studentUserId
        )
      )
    ).subscribe({
      next: (response) => {
        // console.log('Retorno Estudante Filtrado', response)
      }
    })
  }

  public findStudentsById(students: Array<SchoolData>, userId: string ) {
    return of([students.find((student) => student.id === userId)])
  }


  getPeopleProfession(): void {
    this.peoplesDatas
    .pipe(
      map((people) => people.profession)
    ).subscribe({
      next: (response) => console.log('Profissao ', response)
    })
  }

  getSoftwareDevelopersNames(): void {
    this.peoplesDatas
    .pipe(
      // filter eh usado para filtrar os valores que vem de um observable, com base nos criterios que estipulamos
      filter((people) => people.profession === 'Scrum Master' && people.age >20),
      map((people) => people.name)
    ).subscribe({
      next: (response) => console.log('Nome do Desenvolvedor', response)
    })
  }

  //map ele manipula o valor de um Observable, antes mesmo dele ser lido no next
  getMulpliedAges() : void {
    this.ages
    .pipe(
      map((age) => age * 2)
    )
    .subscribe({
      next: (response) => console.log('IDADE MULTIPLICADA', response),
    })
  }

  public getSchoolDatas(): void {
    this.zipSchoolResponses$
    .subscribe({
      next: (response) => {
        console.log(response[0])
        console.log(response[1])
      }
    })
  }



  private getStudentsDatas(): Observable<Array<SchoolData>> {
    return this.schoolService.getStudent()
  }
  private getTeachersDatas(): Observable<Array<SchoolData>> {
    return this.schoolService.getteachers()
  }

}
