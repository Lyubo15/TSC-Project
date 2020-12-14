import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CareerService } from '../career.service';
import { IJob } from '../interfaces/job';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  @Input() limit: number;

  loading: boolean;
  errorMessage: string;
  isLogged = this.authService.isLogged$;

  jobs: IJob[];

  constructor(
    private careerService: CareerService,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;

    this.careerService.getAllCareers().subscribe((careers) => {
      this.loading = false;

      const result = this.limit ? careers.slice(0, this.limit) : careers;
      this.jobs = result;
    });
  }

  handleApply(id: string) {
    this.subscription = this.authService.isLogged$.subscribe(
      (isLogged) => {

        if (isLogged) {
          return this.router.navigate([`/career/apply/${id}`]);
        }

        if (confirm("If you want to apply you have to login. Do you want to go to login page?")) {
          return this.router.navigate([`/signin`]);
        }
      })
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }
}

