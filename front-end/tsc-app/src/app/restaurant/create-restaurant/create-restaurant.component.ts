import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.css']
})
export class CreateRestaurantComponent {

  loading: boolean;
  imageObj: string;
  errorMessage: string;

  constructor(
    private restourantService: RestaurantService,
    private router: Router) { }

  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imageObj = reader.result.toString();
    }
  }

  submitFormHandler(formValue: { name: string, address: string, file: string }) {
    this.loading = true;
    formValue['file'] = this.imageObj;

    this.restourantService.createRestaurant(formValue).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/restaurants']);
      },
      error: (err: HttpErrorResponse) => {
        debugger
        this.errorMessage = err.error.error;
        this.loading = false;
      }
    });
  }
}
