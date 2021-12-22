import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-edit-todo',
    templateUrl: './edit-todo.component.html',
    styleUrls: ['./edit-todo.component.css'],
})
export class EditTodoComponent implements OnInit {
    todoId!: number;
    editTodoForm!: FormGroup;
    isLoading = true;
    alertType = '';
    isError = false;
    message = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) {
        this.editTodoForm = new FormGroup({
            task: new FormControl(null, [
                Validators.required,
                Validators.pattern(/^[a-zA-Z ]+$/),
            ]),
        });
        this.todoId = this.route.snapshot.params['id'];
        this.userService.getSingleTodo(this.todoId).subscribe(
            (res) => {
                setTimeout(() => {
                    this.isLoading = false;
                    if (!res['todo']) {
                        this.router.navigateByUrl('/user/todos-list');
                    } else {
                        this.editTodoForm
                            .get('task')
                            ?.setValue(res['todo']['task']);
                    }
                }, 5000);
            },
            (err) => {
                this.isLoading = false;
                this.isError = true;
                this.message = err['error']['message'];
            }
        );
    }

    ngOnInit(): void {}

    handleFormSubmit() {
        this.isLoading = true;
        this.userService
            .editTodo(this.todoId, this.editTodoForm.get('task')?.value)
            .subscribe(
                (res) => {
                    this.isLoading = false;
                    this.router.navigate(['/user/todos-list'], {
                        state: {
                            message: res.message,
                            alertType: 'alert-success',
                        },
                    });
                },
                (error) => {
                    this.isLoading = false;
                    if (error.status === 401) {
                        this.userService.redirectUser();
                    }
                    if (error['error']['statusCode'] === 406) {
                        error['error']['errors'].forEach((err: any) => {
                            const [param] = Object.keys(err);
                            const [errorType] = Object.keys(err[param]);
                            this.editTodoForm.controls[param]?.setErrors({
                                [errorType]: true,
                            });
                            this.editTodoForm.controls[param].markAsTouched();
                        });
                    } else {
                        this.alertType = 'alert-danger';
                        this.message = error['error']['message'];
                    }
                    this.hideResponseMessage();
                }
            );
    }

    hideResponseMessage() {
        setTimeout(() => {
            this.message = '';
        }, 5000);
    }
}
