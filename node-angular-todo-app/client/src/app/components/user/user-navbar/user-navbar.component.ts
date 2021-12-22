import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-navbar',
    templateUrl: './user-navbar.component.html',
    styleUrls: ['./user-navbar.component.css'],
})
export class UserNavbarComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {}

    handleLogout(event: Event) {
        event.preventDefault();
        this.authService.logout();
        this.router.navigateByUrl('/');
    }
}
