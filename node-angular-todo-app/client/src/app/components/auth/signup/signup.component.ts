import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
    isLoading = false;
    errorMessage = '';
    signupForm!: FormGroup;

    constructor(private authService: AuthService, private router: Router) {
        if (this.authService.accessToken !== '') {
            this.router.navigateByUrl('/user/todos-list');
        }
    }

    ngOnInit(): void {
        this.signupForm = new FormGroup({
            name: new FormControl(null, [
                Validators.required,
                Validators.pattern(/^[a-zA-Z ]+$/),
            ]),
            email: new FormControl(
                null,
                [Validators.required, Validators.email],
                this.authService.checkEmailAvailability()
            ),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
            ]),
        });
    }

    handleFormSubmit() {
        this.isLoading = true;
        this.authService.signup(this.signupForm.value).subscribe(
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
                        this.signupForm.controls[param]?.setErrors({
                            [errorType]: true,
                        });
                        this.signupForm.controls[param].markAsTouched();
                    });
                } else {
                    this.errorMessage = error['error']['message'];
                }
            }
        );
    }
}
