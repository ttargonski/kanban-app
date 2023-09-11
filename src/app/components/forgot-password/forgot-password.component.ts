import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  email: string = '';
  errors: string[] = [];

  constructor(private authService: AuthService) {}

  sendResetLink() {
    if (this.email === '') {
      this.errors.push('Please enter your email');
    } else {
      this.authService.ForgotPassword(this.email);
    }
  }
}
