import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestourantRoutingModule } from './restaurant-routing.module';
import { CreateRestaurantComponent } from './create-restaurant/create-restaurant.component';
import { RestaurantService } from './restaurant.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';

@NgModule({
  declarations: [CreateRestaurantComponent, RestaurantsComponent, EditRestaurantComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    RestourantRoutingModule,
  ],
  providers: [RestaurantService]
})
export class RestaurantModule { }
