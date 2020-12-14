import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CareerService } from '../../career.service';
import { IJob } from '../../interfaces/job';

@Component({
  selector: 'app-job-article',
  templateUrl: './job-article.component.html',
  styleUrls: ['./job-article.component.css']
})
export class JobArticleComponent implements OnInit {

  job: IJob = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private careerService: CareerService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    this.careerService.getCareerById(id).subscribe(career => {
      this.job = career;
    });
  }
}
