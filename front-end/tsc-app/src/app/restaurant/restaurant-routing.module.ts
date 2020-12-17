import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../core/auth/admin.guard';
import { AuthGuard } from '../core/auth/auth.guard';
import { CreateRestaurantComponent } from './create-restaurant/create-restaurant.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';

const routes: Routes = [
    {
        path: 'restaurants',
        pathMatch: 'full',
        component: RestaurantsComponent
    },
    {
        path: 'restaurant/create',
        pathMatch: 'full',
        component: CreateRestaurantComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'restaurant/edit/:id',
        pathMatch: 'full',
        component: EditRestaurantComponent,
        canActivate: [AuthGuard, AdminGuard]
    }
];

export const RestourantRoutingModule = RouterModule.forChild(routes);

