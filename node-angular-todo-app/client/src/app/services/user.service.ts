import { Router } from '@angular/router';
import { todoModel } from './../models/todo.model';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    todos: todoModel[] = [];
    todosSubject: Subject<todoModel[]> = new Subject();

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService,
        private router: Router
    ) {}

    // Get All Todos
    getAllTodos(): Observable<any> {
        return this.httpClient.get<any>(`api/user/get-all-todos`, {
            headers: {
                Authorization: `${this.authService.accessToken}`,
            },
        });
    }

    // Get Single Todo
    getSingleTodo(id: number): Observable<any> {
        return this.httpClient.get<any>(`api/user/get-single-todo/${id}`, {
            headers: {
                Authorization: `${this.authService.accessToken}`,
            },
        });
    }

    // Create Todo
    addTodo(task: string): Observable<any> {
        return this.httpClient.post<any>(
            `api/user/create-todo`,
            {
                task,
            },
            {
                headers: {
                    Authorization: `${this.authService.accessToken}`,
                },
            }
        );
    }

    // Edit Todo
    editTodo(id: number, task: string): Observable<any> {
        return this.httpClient.put<any>(
            `api/user/edit-todo/${id}`,
            { task },
            {
                headers: {
                    Authorization: `${this.authService.accessToken}`,
                },
            }
        );
    }

    // Update Todo Status
    updateTodoStatus(id: number, status: boolean): Observable<any> {
        return this.httpClient.put<any>(
            `api/user/update-todo-status/${id}`,
            { status },
            {
                headers: {
                    Authorization: `${this.authService.accessToken}`,
                },
            }
        );
    }

    // Delete Single Todo
    deleteTodo(id: number): Observable<any> {
        return this.httpClient.delete<any>(`api/user/delete-todo/${id}`, {
            headers: {
                Authorization: `${this.authService.accessToken}`,
            },
        });
    }

    // Bulk Delete Todos
    bulkDeleteTodos(ids: number[]): Observable<any> {
        return this.httpClient.delete<any>(`api/user/bulk-delete-todos`, {
            headers: {
                Authorization: `${this.authService.accessToken}`,
            },
            body: { ids },
        });
    }

    setTodos(todos: todoModel[]) {
        this.todos = todos;
    }

    getTodos(): Observable<todoModel[]> {
        return this.todosSubject.asObservable();
    }

    redirectUser() {
        this.authService.logout();
        this.router.navigateByUrl('/');
    }
}
