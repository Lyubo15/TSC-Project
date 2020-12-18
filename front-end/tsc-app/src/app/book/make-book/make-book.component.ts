import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IRestourant } from 'src/app/restaurant/interfaces/restourant';
import { RestaurantService } from 'src/app/restaurant/restaurant.service';
import { BookService } from '../book.service';

@Component({
  selector: 'app-make-book',
  templateUrl: './make-book.component.html',
  styleUrls: ['./make-book.component.css']
})
export class MakeBookComponent implements OnInit {

  loading: boolean;
  errorMessage: string;
  restaurants: IRestourant[]

  minDate = new Date();
  maxDate = new Date();

  constructor(
    private restaurantService: RestaurantService,
    private bookService: BookService,
    private router: Router
  ) {
    this.maxDate.setDate(this.minDate.getDate() + 7)
  }

  ngOnInit() {
    this.restaurantService.getAllRestaurants().subscribe((restaurants) => {
      this.restaurants = restaurants;
    })
  }

  submitFormHandler(formValue: { count: number, date: Date, houe: string, restaurant: string }) {    
    this.loading = true;
    debugger
    this.bookService.makeABook(formValue).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        debugger
        this.errorMessage = err.error.error;
        this.loading = false;
      }
    });
  }

}
