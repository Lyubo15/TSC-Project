import { Routes, RouterModule } from '@angular/router';
import { LoggedGuard } from '../core/auth/logged.guard';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';


const routes: Routes = [
    {
        path: 'signin',
        component: SigninComponent,
        canActivate: [LoggedGuard],
        data: {
            isLogged: false
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LoggedGuard],
        data: {
            isLogged: false
        }
    }
];

export const UserRoutingModule = RouterModule.forChild(routes);
