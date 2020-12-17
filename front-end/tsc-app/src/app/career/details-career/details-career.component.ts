import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CareerService } from '../career.service';
import { IJob } from '../interfaces/job';

@Component({
  selector: 'app-details-career',
  templateUrl: './details-career.component.html',
  styleUrls: ['./details-career.component.css']
})
export class DetailsCareerComponent implements OnInit {

  job: IJob = null;
  isUserAnAdmin = this.authService.isUserAnAdmin$;
  loading: boolean;

  constructor(
    private careerService: CareerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    this.careerService.getCareerById(id).subscribe(career => {
      this.job = career;
    });
  }

  deleteCareer(id: string) {
    this.loading = true;
    this.careerService.deleteCareerById(id).subscribe(() => {
      this.loading = false;
      this.router.navigate(['/career']);
    });
  }
}