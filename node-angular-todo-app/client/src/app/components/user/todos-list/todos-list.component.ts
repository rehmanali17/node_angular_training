import { AuthService } from './../../../services/auth.service';
import { todoModel } from './../../../models/todo.model';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-todos-list',
    templateUrl: './todos-list.component.html',
    styleUrls: ['./todos-list.component.css'],
})
export class TodosListComponent implements OnInit {
    todos: todoModel[] = [];
    deleteMultipleTodos: number[] = [];
    alertType = '';
    message = '';
    isLoading = true;
    isError = false;

    constructor(
        private userService: UserService,
        private router: Router,
        private authService: AuthService
    ) {
        if (this.router.getCurrentNavigation()?.extras.state) {
            this.message =
                this.router.getCurrentNavigation()?.extras.state!['message'];
            this.alertType =
                this.router.getCurrentNavigation()?.extras.state!['alertType'];
            this.hideResponseMessage();
        }
        this.fetchTodos();
    }

    ngOnInit(): void {}

    handleStatusChange(id: number, status: boolean) {
        if (status === true) {
            this.deleteMultipleTodos.push(id);
        } else {
            this.deleteMultipleTodos = this.deleteMultipleTodos.filter(
                (element) => element !== id
            );
        }
        this.userService.updateTodoStatus(id, status).subscribe(
            (res) => {
                this.alertType = 'alert-success';
                this.message = res.message;
                this.hideResponseMessage();
                this.fetchTodos();
            },
            (err) => {
                if (err.status === 401) {
                    this.userService.redirectUser();
                }
                this.alertType = 'alert-danger';
                this.message = err['error']['message'];
                this.hideResponseMessage();
            }
        );
    }

    deleteTodo(id: number) {
        this.userService.deleteTodo(id).subscribe(
            (res) => {
                this.alertType = 'alert-success';
                this.message = res.message;
                this.hideResponseMessage();
                this.fetchTodos();
            },
            (err) => {
                if (err.status === 401) {
                    this.userService.redirectUser();
                }
                this.alertType = 'alert-danger';
                this.message = err['error']['message'];
                this.hideResponseMessage();
            }
        );
    }

    handleBulkDelete(event: Event) {
        event.preventDefault();
        this.userService.bulkDeleteTodos(this.deleteMultipleTodos).subscribe(
            (res) => {
                this.alertType = 'alert-success';
                this.message = res.message;
                this.hideResponseMessage();
                this.fetchTodos();
            },
            (err) => {
                if (err.status === 401) {
                    this.userService.redirectUser();
                }
                this.alertType = 'alert-danger';
                this.message = err['error']['message'];
                this.hideResponseMessage();
            }
        );
    }

    hideResponseMessage() {
        setTimeout(() => {
            this.message = '';
        }, 5000);
    }

    redirectToEditPage(id: number) {
        this.router.navigate(['/user/edit-todo', id]);
    }

    fetchTodos() {
        this.userService.getAllTodos().subscribe(
            (todos) => {
                this.isLoading = false;
                this.deleteMultipleTodos = [];
                this.userService.setTodos(todos['todos']);
                this.todos = todos['todos'];
                this.todos.forEach((todo) => {
                    if (todo.isDone === true) {
                        this.deleteMultipleTodos.push(todo.id);
                    }
                });
            },
            (err) => {
                if (err.status === 401) {
                    this.userService.redirectUser();
                }
                this.isError = true;
                this.message = err['error']['message'];
                this.alertType = 'alert-danger';
            }
        );
    }
}
