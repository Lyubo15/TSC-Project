import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { IRestourant } from '../interfaces/restourant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  loading: boolean;
  isUserAnAdmin = this.authService.isUserAnAdmin$;

  restaurants: IRestourant[];

  constructor(
    private restaurantService: RestaurantService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.restaurantService.getAllRestaurants().subscribe((restaurants) => {
      this.loading = false;
      this.restaurants = restaurants;
    })
  }

  deleteRestaurant(id: string) {
    this.loading = true;
    this.restaurantService.deleteRestaurant(id).subscribe(() => {
      this.loading = false;
      window.location.reload();
    })
  }
}
