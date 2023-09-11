import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent {
  constructor(private authService: AuthService) {}

  isLogged(): boolean {
    return this.authService.isLoggedIn;
  }
}
