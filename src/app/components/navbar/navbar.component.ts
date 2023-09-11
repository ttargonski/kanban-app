import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userEmail: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.setUsername();
      }
    });
    this.setUsername();
  }
  ngOnInit(): void {
    this.setUsername();
  }

  setUsername() {
    this.userEmail = this.authService.getUserEmail();
  }

  isLogged(): boolean {
    return this.authService.isLoggedIn;
  }

  logout() {
    this.authService.SignOut();
    this.userEmail = '';
  }
}
