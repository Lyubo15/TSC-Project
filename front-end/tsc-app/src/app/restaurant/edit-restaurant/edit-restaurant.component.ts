import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent {

  loading: boolean;
  imageObj: string;
  errorMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
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
    const id = this.activatedRoute.snapshot.params.id;

    this.restourantService.editRestourantById(formValue, id).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/restaurants']);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error.error;
        this.loading = false;
      }
    });
  }
}
