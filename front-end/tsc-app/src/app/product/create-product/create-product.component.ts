import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  loading: boolean;
  imageObj: string;
  errorMessage: string;

  isPriceNotValid = false;
  isCountNotValid = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  priceHandler(price: number) {
    Number(price) >= 0 ? this.isPriceNotValid = false : this.isPriceNotValid = true;
  }

  countHandler(price: number) {
    Number(price) >= 0 ? this.isCountNotValid = false : this.isCountNotValid = true;
  }

  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imageObj = reader.result.toString();
    }
  }

  submitFormHandler(formValue: { name: string, description: string, price: number, count: number, file: string }) {
    this.loading = true;
    formValue['file'] = this.imageObj;
    const id = this.activatedRoute.snapshot.params.id;

    this.productService.createProduct(formValue, id).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/menu']);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error.error;
        this.loading = false;
      }
    });
  }
}
