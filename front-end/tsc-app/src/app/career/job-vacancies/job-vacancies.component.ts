import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service'
import { CareerService } from '../career.service';

@Component({
  selector: 'app-job-vacancies',
  templateUrl: './job-vacancies.component.html',
  styleUrls: ['./job-vacancies.component.css']
})
export class JobVacanciesComponent implements OnInit {

  loading: boolean;
  errorMessage: string;

  isUserAnAdmin = this.authService.isUserAnAdmin$;

  constructor(private authService: AuthService, private careerService: CareerService) {
  }

  ngOnInit(): void {
  }
}