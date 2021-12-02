import { Component, OnInit } from '@angular/core';
import { ManageTodosService } from 'src/app/services/manage-todos.service';
import { Subscription } from 'rxjs';
import { todosModel } from 'src/app/models/todos.model';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {
  todos: todosModel[] = []
  todosSubscription: Subscription;
  doesExistTodos = false;

  constructor(private todoService: ManageTodosService) {
    this.todosSubscription = this.todoService.getTodos()
      .subscribe(todos => {  
        this.todos = todos
        this.doesExistTodos = this.todos.length > 0 ? true : false
      })
  }

  ngOnInit(): void {
    this.todoService.getTodosOnLoad()
  }

}
