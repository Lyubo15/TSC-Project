import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { emailValidator } from '../validations/email.validator';
import { rePasswordValidatorFactory } from '../validations/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup;
  errorMessage: string;
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.errorMessage = '';
    const passwordControl = this.fb.control('', [Validators.required, Validators.minLength(5)]);

    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, emailValidator]],
      tel: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]*$/)]],
      password: passwordControl,
      rePassword: ['', [Validators.required, Validators.minLength(5), rePasswordValidatorFactory(passwordControl)]],
      rememberMe: [false]
    });
  }

  submitHandler(): void {
    const data = this.form.value;
    this.loading = true;

    this.authService.register(data).subscribe({
      next: (response) => {
        this.authService.authentication(response.body['accessToken'], data.rememberMe);
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error.error.firstName;
        this.loading = false;
      }
    });
  }
}