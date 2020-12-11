import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
 

@NgModule({
  declarations: [JobVacanciesComponent, JobsComponent, CreateCareerComponent, DetailsCareerComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    CareerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [CareerService]
})
export class CareerModule { }
