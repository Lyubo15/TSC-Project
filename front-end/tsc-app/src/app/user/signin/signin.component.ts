import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  loading: boolean;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {
    this.errorMessage = '';
  }

  submitFormHandler(formValue: { firstName: string, password: string, rememberMe: boolean }) {
    this.loading = true;

    this.authService.signin({firstName: formValue.firstName, password: formValue.password}).subscribe({
      next: (response) => {
        this.authService.authentication(response.body['accessToken'], formValue.rememberMe);
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error.message;
        this.loading = false;
      }
    });
  }
}
