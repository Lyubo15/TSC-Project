import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../core/auth/admin.guard';
import { AuthGuard } from '../core/auth/auth.guard';
import { AllMenuesComponent } from './all-menues/all-menues.component';
import { CreateMenuComponent } from './create-menu/create-menu.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { MenuProductsComponent } from './menu-products/menu-products.component';

const routes: Routes = [
    {
        path: 'menu',
        pathMatch: 'full',
        component: AllMenuesComponent,
    },
    {
        path: 'menu/create',
        pathMatch: 'full',
        component: CreateMenuComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'menu/edit/:id',
        pathMatch: 'full',
        component: EditMenuComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'menu/:id/products',
        pathMatch: 'full',
        component: MenuProductsComponent
    }
];

export const MenuRoutingModule = RouterModule.forChild(routes);

