import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  errors: string[] = [];

  constructor(private authService: AuthService) {
    localStorage.removeItem('boards');
  }

  login() {
    this.errors = [];
    if (this.email === '') {
      this.errors.push(' Please enter a valid email address');
    }

    if (this.password === '') {
      this.errors.push('Please enter password!');
    }

    if (this.email !== '' && this.password !== '') {
      this.authService.SignIn(this.email, this.password);
    }
  }

  singInWithGoogle() {
    this.authService.googleSignIn();
  }
}
