import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {}

    canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
        if (
            this.authService.isLoggedin === true ||
            this.authService.accessToken !== ''
        ) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}
