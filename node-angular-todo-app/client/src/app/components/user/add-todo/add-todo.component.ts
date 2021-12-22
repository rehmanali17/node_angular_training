import { AuthService } from './../../../services/auth.service';
import { UserService } from './../../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-todo',
    templateUrl: './add-todo.component.html',
    styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
    addTodoForm!: FormGroup;
    isLoading = false;
    alertType = '';
    message = '';

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private router: Router
    ) {
        this.addTodoForm = new FormGroup({
            task: new FormControl(null, [
                Validators.required,
                Validators.pattern(/^[a-zA-Z ]+$/),
            ]),
        });
    }

    ngOnInit(): void {}

    handleFormSubmit() {
        this.isLoading = true;
        this.userService.addTodo(this.addTodoForm.get('task')?.value).subscribe(
            (res) => {
                this.isLoading = false;
                this.alertType = 'alert-success';
                this.message = res.message;
                this.addTodoForm.controls['task'].setValue('');
                this.addTodoForm.controls['task'].setErrors(null);
                this.hideResponseMessage();
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
                        this.addTodoForm.controls[param]?.setErrors({
                            [errorType]: true,
                        });
                        this.addTodoForm.controls[param].markAsTouched();
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
