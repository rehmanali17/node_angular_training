import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    isLoading = false;
    errorMessage = '';
    loginForm!: FormGroup;

    constructor(private authService: AuthService, private router: Router) {
        if (this.authService.accessToken !== '') {
            this.router.navigateByUrl('/user/todos-list');
        }
    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl(null, [Validators.required]),
        });
    }

    handleFormSubmit() {
        this.isLoading = true;
        this.authService.login(this.loginForm.value).subscribe(
            (res) => {
                this.isLoading = false;
                this.authService.updateAuthStatus(true);
                this.authService.setAccessToken(res.accessToken);
                this.router.navigateByUrl('/user/todos-list');
            },
            (error) => {
                this.isLoading = false;
                if (error['error']['statusCode'] === 406) {
                    error['error']['errors'].forEach((err: any) => {
                        const [param] = Object.keys(err);
                        const [errorType] = Object.keys(err[param]);
                        this.loginForm.controls[param]?.setErrors({
                            [errorType]: true,
                        });
                        this.loginForm.controls[param].markAsTouched();
                    });
                } else {
                    this.errorMessage = error['error']['message'];
                }
            }
        );
    }
}
