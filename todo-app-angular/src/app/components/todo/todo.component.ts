import { Component, OnInit, Input } from '@angular/core';
import { Event } from '@angular/router';
import { todosModel } from 'src/app/models/todos.model';
import { ManageTodosService } from 'src/app/services/manage-todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo: todosModel = {id:-1,content:'',isChecked:false}
  checkTodo:boolean = false
  constructor(private todoService: ManageTodosService) {}

  ngOnInit(): void {
  }

  deleteTodo(id:number){
    this.todoService.removeTodo(id)
  }

  handleChange(id:number){
    this.todoService.updateTodoStatus(id,this.checkTodo)
  }

  // updateTodoStatus(id:number,status:boolean){
  //   this.todoService.updateTodoStatus()
  // }

}
