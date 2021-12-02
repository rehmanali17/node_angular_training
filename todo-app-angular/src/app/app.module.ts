import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContainerComponent } from './components/container/container.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TodoComponent } from './components/todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    AddTodoComponent,
    TodosListComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
