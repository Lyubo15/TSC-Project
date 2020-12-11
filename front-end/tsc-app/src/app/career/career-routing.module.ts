import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/auth/admin.guard';
import { AuthGuard } from '../core/auth/auth.guard';
import { CreateCareerComponent } from './create-career/create-career.component';
import { DetailsCareerComponent } from './details-career/details-career.component';
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
    }
];

export const CareerRoutingModule = RouterModule.forChild(routes);
