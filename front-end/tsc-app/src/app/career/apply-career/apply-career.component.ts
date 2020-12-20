import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerService } from '../career.service';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-apply-career',
  templateUrl: './apply-career.component.html',
  styleUrls: ['./apply-career.component.css']
})
export class ApplyCareerComponent implements OnInit{

  loading: boolean;
  jobId = this.activatedRoute.snapshot.params.id;
  errorMessage: string;
  userId: string;

  constructor(
    private careerService: CareerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem(environment.USER_INFO_KEY)).userId
  }

  submitFormHandler(formValue: { 'aboutYou': string }) {
    this.loading = true;
    this.careerService.applyForCareer(formValue, this.jobId, this.userId).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/career']);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error.error;
        this.loading = false;
      }
    });
  }
}
