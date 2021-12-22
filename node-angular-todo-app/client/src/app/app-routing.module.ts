import { TodosListComponent } from './components/user/todos-list/todos-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AddTodoComponent } from './components/user/add-todo/add-todo.component';
import { EditTodoComponent } from './components/user/edit-todo/edit-todo.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: 'user',
        canActivateChild: [AuthGuardService],
        children: [
            { path: 'todos-list', component: TodosListComponent },
            { path: 'add-todo', component: AddTodoComponent },
            { path: 'edit-todo/:id', component: EditTodoComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
