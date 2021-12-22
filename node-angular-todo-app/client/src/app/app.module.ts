import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { TodosListComponent } from './components/user/todos-list/todos-list.component';
import { AuthNavbarComponent } from './components/auth/auth-navbar/auth-navbar.component';
import { UserNavbarComponent } from './components/user/user-navbar/user-navbar.component';
import { AddTodoComponent } from './components/user/add-todo/add-todo.component';
import { EditTodoComponent } from './components/user/edit-todo/edit-todo.component';

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        LoginComponent,
        TodosListComponent,
        AuthNavbarComponent,
        UserNavbarComponent,
        AddTodoComponent,
        EditTodoComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
