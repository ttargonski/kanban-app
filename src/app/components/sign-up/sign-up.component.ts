import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  email: string = '';
  password: string = '';
  cpassword: string = '';
  errors: string[] = [];

  constructor(private router: Router, private authService: AuthService) {}

  register() {
    this.errors = [];
    if (this.email === '') {
      this.errors.push(' Please enter a valid email address');
    }
    if (this.password === '') {
      this.errors.push('Please enter password!');
    }
    if (this.password !== this.cpassword) {
      this.errors.push('Passwords do not match!');
    }

    if (
      this.email !== '' &&
      this.password !== '' &&
      this.password === this.cpassword
    ) {
      this.authService.SignUp(this.email, this.password);
    }
  }
}
