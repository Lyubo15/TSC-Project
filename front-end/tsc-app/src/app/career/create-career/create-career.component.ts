import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CareerService } from '../career.service'

@Component({
  selector: 'app-create-career',
  templateUrl: './create-career.component.html',
  styleUrls: ['./create-career.component.css']
})
export class CreateCareerComponent {

  loading: boolean;
  errorMessage: string;

  constructor(private careerService: CareerService, private router: Router) {
    this.errorMessage = '';
  }

  submitFormHandler(formValue: { title: string, description: string }) {
    this.loading = true;

    this.careerService.createCareer({ title: formValue.title, description: formValue.description }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/career']);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error.message;
        this.loading = false;
      }
    });
  }
}
