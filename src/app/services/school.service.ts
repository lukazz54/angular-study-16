import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SchoolData {
  name: string;
  id:string
}

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private students: Array<SchoolData> = [
    {
      name: "Lucas", id: '1'
    },
    {
      name: "joão", id: '2'
    },
    {
      name: "Maria", id: "3"
    }
  ]

  private teachers: Array<SchoolData> = [
    {
      name: "Jorge", id: '1'
    },
    {
      name: "Miguel", id: '2'
    },
    {
      name: "Denison", id: "3"
    }
  ]


 public getStudent(): Observable<Array<SchoolData>>{
  return of(this.students);
 }

 public getteachers(): Observable<Array<SchoolData>>{
  return of(this.teachers);
 }



}
