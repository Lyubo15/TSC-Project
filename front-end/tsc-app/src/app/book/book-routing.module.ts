import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth/auth.guard';
import { MakeBookComponent } from './make-book/make-book.component';

const routes: Routes = [
    {
        path: 'book',
        pathMatch: 'full',
        component: MakeBookComponent,
        canActivate: [AuthGuard]
    },
    
];

export const BookRoutingModule = RouterModule.forRoot(routes);

