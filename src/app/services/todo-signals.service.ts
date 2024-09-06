import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/model/todo.model';
import { TodoKeyLocalStorage } from '../models/enum/todoKeyLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class TodoSignalsService {

  //signal
  public todosState = signal<Array<Todo>>([]);

//o metodo mutate eh para mudar o valor do signal, porem eh bom usar esse metodos
//quando for lidar com Array
  public updateTodos({id, title, description, done}: Todo): void {
    if(title && id && description !== null || undefined) {
      this.todosState.mutate((todos) => {
        if(todos !== null) {
          todos.push(new Todo(id, title, description, done))
        }
      });
      this.saveTodosInLocalStorage();
    }
  }

  //Para pegar o valor do signal, precisa ser na mesma nomenclatura
  //de uma função
  public saveTodosInLocalStorage(): void {
    const todos = JSON.stringify(this.todosState());
    todos && localStorage.setItem(TodoKeyLocalStorage.TODO_LIST, todos)
  }
}
