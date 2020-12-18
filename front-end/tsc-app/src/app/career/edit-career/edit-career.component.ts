import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerService } from '../career.service';
import { IJob } from '../interfaces/job';

@Component({
  selector: 'app-edit-career',
  templateUrl: './edit-career.component.html',
  styleUrls: ['./edit-career.component.css']
})
export class EditCareerComponent implements OnInit{

  loading: boolean;
  errorMessage: string;
  career: IJob
  id = this.activatedRoute.snapshot.params.id;

  constructor(
    private careerService: CareerService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
   
      this.errorMessage = '';
  }

  ngOnInit() {
    debugger
    this.careerService.getCareerById(this.id).subscribe((career) => {
      debugger
      this.career = career;
    })
  }

  submitFormHandler(formValue: { title: string, description: string }) {
    this.loading = true;

    this.careerService.editCareer(formValue, this.id).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate([`/career/details/${this.id}`]);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error.error;
        this.loading = false;
      }
    });
  }
}