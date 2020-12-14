import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/auth/admin.guard';
import { AuthGuard } from '../core/auth/auth.guard';
import { ApplyCareerComponent } from './apply-career/apply-career.component';
import { CandidaturesComponent } from './candidatures/candidatures.component';
import { CreateCareerComponent } from './create-career/create-career.component';
import { DetailsCandidatureComponent } from './details-candidature/details-candidature.component';
import { DetailsCareerComponent } from './details-career/details-career.component';
import { EditCareerComponent } from './edit-career/edit-career.component';
import { JobVacanciesComponent } from './job-vacancies/job-vacancies.component';

const routes: Routes = [
    {
        path: 'career',
        pathMatch: 'full',
        component: JobVacanciesComponent
    },
    {
        path: 'career/create',
        pathMatch: 'full',
        component: CreateCareerComponent,
        canActivate: [AuthGuard, AdminGuard],
    },
    {
        path: 'career/details/:id',
        pathMatch: 'full',
        component: DetailsCareerComponent
    },
    {
        path: 'career/edit/:id',
        pathMatch: 'full',
        component: EditCareerComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'career/apply/:id',
        pathMatch: 'full',
        component: ApplyCareerComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'candidatures',
        pathMatch: 'full',
        component: CandidaturesComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'candidature/details/:id',
        pathMatch: 'full',
        component: DetailsCandidatureComponent,
        canActivate: [AuthGuard, AdminGuard]
    }
];

export const CareerRoutingModule = RouterModule.forChild(routes);
