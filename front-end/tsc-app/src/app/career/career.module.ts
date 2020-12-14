import { NgModule } from '@angular/core';
import { JobVacanciesComponent } from './job-vacancies/job-vacancies.component';
import { JobsComponent } from './jobs/jobs.component';
import { RouterModule } from '@angular/router';
import { CareerRoutingModule } from './career-routing.module';
import { CreateCareerComponent } from './create-career/create-career.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module'
import { CareerService } from './career.service';
import { CoreModule } from '../core/core.module';
import { DetailsCareerComponent } from './details-career/details-career.component';
import { EditCareerComponent } from './edit-career/edit-career.component';
import { ApplyCareerComponent } from './apply-career/apply-career.component';
import { JobArticleComponent } from './details-career/job-article/job-article.component';
import { CommonModule } from '@angular/common';
import { CandidaturesComponent } from './candidatures/candidatures.component';
import { DetailsCandidatureComponent } from './details-candidature/details-candidature.component';


@NgModule({
  declarations: [
    JobVacanciesComponent,
    JobsComponent,
    CreateCareerComponent,
    DetailsCareerComponent,
    EditCareerComponent,
    ApplyCareerComponent,
    JobArticleComponent,
    CandidaturesComponent,
    DetailsCandidatureComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    SharedModule,
    RouterModule,
    CareerRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [JobsComponent],
  providers: [CareerService]
})
export class CareerModule { }
