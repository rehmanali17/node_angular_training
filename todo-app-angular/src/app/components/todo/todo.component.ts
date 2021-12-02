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
  
  @Input() todo: todosModel = { id:-1, body:'', isChecked:false }
  
  constructor(private todoService: ManageTodosService) {}

  ngOnInit(): void {
  }

  deleteTodo(id:number){
    this.todoService.removeTodo(id)
  }

  handleStatusChange(id:number,status:boolean){
    this.todoService.updateTodoStatus(id,status)
  }


}
