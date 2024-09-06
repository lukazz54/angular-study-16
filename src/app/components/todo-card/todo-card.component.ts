import { TodoSignalsService } from 'src/app/services/todo-signals.service';
import { Component, OnInit, computed, inject } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TodoKeyLocalStorage } from 'src/app/models/enum/todoKeyLocalStorage';
import { Todo } from 'src/app/models/model/todo.model';

//Podemos importar em um component stanalone somente as diretivas de um modulo
//EX: ao invez de importar o CommonModule inteiro, importando apenas as diretivas dele NgIf, NgFor
@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
      NgFor,
      NgIf,
      NgTemplateOutlet,
      MatCardModule,
      MatButtonModule,
      MatIconModule,
      MatTabsModule
  ],
  templateUrl: './todo-card.component.html',
  styleUrls: []
})
export class TodoCardComponent implements OnInit{



    private todoSignalsService = inject(TodoSignalsService);
    private todosSignal = this.todoSignalsService.todosState;
    //O computed eh uma maneira de estar gerando mais facilmente valores computados
    //Os valores computados sao aqueles que dependem do valor de outros signals
    //OBS: Toda vez que o valor do signal mudar, o valor dos computed tbm eh alterado
    public todosList = computed(() => this.todosSignal());


    ngOnInit(): void {
      this.getTodosInLocalStorage();
    }


  private getTodosInLocalStorage() : void{
    const todosDatas = localStorage.getItem(TodoKeyLocalStorage.TODO_LIST) as string;

    //set um novo valor no signal
    todosDatas && (this.todosSignal.set(JSON.parse(todosDatas)));
  }

  private saveTodosInLocalStorage(): void {
    this.todoSignalsService.saveTodosInLocalStorage();
  }

  handleDoneTodo(todoId: number): void {
    if(todoId) {
      //mutate serve para atualizar um valor, com base em um valor antigo!
      this.todosSignal.mutate((todos => {
          const todoSelected = todos.find((todo) => todo?.id === todoId) as Todo;
          todoSelected && (todoSelected.done = true);
          this.saveTodosInLocalStorage();
        }))
    }
  }

  handleDeleteTodo(todo: Todo): void {
    if (todo) {
      const index = this.todosList().indexOf(todo);

      if(index !== -1) {
        this.todosSignal.mutate((todos) => {
          todos.splice(index, 1);
          this.saveTodosInLocalStorage();
        })
      }
    }
  }

}
