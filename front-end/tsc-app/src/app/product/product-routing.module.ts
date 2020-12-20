import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../core/auth/admin.guard';
import { AuthGuard } from '../core/auth/auth.guard';
import { CreateProductComponent } from './create-product/create-product.component';

const routes: Routes = [
    {
        path: 'product/create/:id',
        pathMatch: 'full',
        component: CreateProductComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
];

export const ProductRoutingModule = RouterModule.forChild(routes);

