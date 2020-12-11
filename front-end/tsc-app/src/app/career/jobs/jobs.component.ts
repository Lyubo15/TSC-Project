import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CareerService } from '../career.service';
import { IJob } from '../interfaces/job';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  loading: boolean;
  errorMessage: string;

  jobs: IJob[];

  constructor(private careerService: CareerService) {
  }

  ngOnInit(): void {
    this.careerService.getAllCareers().subscribe((careers) => {
      this.jobs = careers;
    });
  }
}
