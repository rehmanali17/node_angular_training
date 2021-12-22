import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    isLoggedin = this.authService.isLoggedin;
    authSubscription!: Subscription;
    title = 'Todo App';

    constructor(private authService: AuthService) {
        this.authSubscription = this.authService
            .getAuthStatus()
            .subscribe((status) => {
                this.isLoggedin = status;
            });
    }
}
