import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { todosModel } from '../models/todos.model';

@Injectable({
  providedIn: 'root'
})
export class ManageTodosService {
  private todos: todosModel[] = []
  private todosSubject = new Subject<any>()

  constructor() {}

  addTodo(todo:todosModel){
    this.todos.push(todo)
    localStorage.setItem('todos',JSON.stringify(this.todos))
    this.todosSubject.next(this.todos)
  }

  removeTodo(id:number){
    this.todos = this.todos.filter((todo:todosModel) => todo.id !== id)
    localStorage.setItem('todos',JSON.stringify(this.todos))
    this.todosSubject.next(this.todos)
  }

  getTodosOnLoad(){
    if(localStorage.getItem('todos')){
      this.todos = JSON.parse(localStorage.getItem('todos')!)
    }else{
      this.todos = []
    }
    this.todosSubject.next(this.todos)
  }

  getTodosLength(){
    return this.todos.length
  }

  updateTodoStatus(id:number, status:boolean){
    this.todos[id].isChecked = status
    localStorage.setItem('todos',JSON.stringify(this.todos))
  }

  getTodos():Observable<any>{
    return this.todosSubject.asObservable()
  }


}
