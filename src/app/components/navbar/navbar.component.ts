import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {}

  setUsername() {
    return this.authService.getUserEmail();
  }

  isLogged(): boolean {
    return this.authService.isLoggedIn;
  }

  logout() {
    this.authService.SignOut();
  }
}
