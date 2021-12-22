import { loginFormModel } from './../models/login-form.model';
import { Injectable } from '@angular/core';
import { signupFormModel } from '../models/signup-form.model';
import { baseURL } from '../utils/base-url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, Subject } from 'rxjs';
import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors,
} from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    accessToken = localStorage.getItem('accessToken') ?? '';
    isLoggedin = this.accessToken === '' ? false : true;
    authSubject: Subject<boolean> = new Subject();

    constructor(private httpClient: HttpClient) {}

    signup(user: signupFormModel): Observable<any> {
        return this.httpClient.post(`${baseURL}/api/auth/signup`, user, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        });
    }

    login(user: loginFormModel): Observable<any> {
        return this.httpClient.post(`${baseURL}/api/auth/login`, user, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        });
    }

    checkEmailAvailability(): AsyncValidatorFn {
        return (
            control: AbstractControl
        ): Observable<ValidationErrors | null> => {
            return this.httpClient
                .post<any>(
                    `${baseURL}/api/auth/check-email-availability`,
                    { email: control.value },
                    {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json',
                        }),
                    }
                )
                .pipe(
                    map((res: any) => {
                        if (!res['isEmailAvailable']) {
                            return { emailIsForbidden: true };
                        } else {
                            return null;
                        }
                    }),
                    catchError(async (err) => null)
                );
        };
    }

    updateAuthStatus(status: boolean) {
        this.isLoggedin = status;
        this.authSubject.next(this.isLoggedin);
    }

    getAuthStatus(): Observable<boolean> {
        return this.authSubject.asObservable();
    }

    setAccessToken(token: string) {
        localStorage.setItem('accessToken', token);
        this.accessToken = token;
    }

    getAccessToken(): string {
        return this.accessToken;
    }

    logout() {
        this.isLoggedin = false;
        this.accessToken = '';
        localStorage.removeItem('accessToken');
        this.authSubject.next(this.isLoggedin);
    }
}
