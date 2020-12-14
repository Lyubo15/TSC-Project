import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerService } from '../career.service';

@Component({
  selector: 'app-edit-career',
  templateUrl: './edit-career.component.html',
  styleUrls: ['./edit-career.component.css']
})
export class EditCareerComponent {

  loading: boolean;
  errorMessage: string;

  constructor(
    private careerService: CareerService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      
    this.errorMessage = '';
  }

  submitFormHandler(formValue: { title: string, description: string }) {
    const id = this.activatedRoute.snapshot.params.id;
    this.loading = true;

    this.careerService.editCareer(formValue, id).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate([`/career/details/${id}`]);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error.message;
        this.loading = false;
      }
    });
  }
}