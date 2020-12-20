import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent {

  loading: boolean;
  imageObj: string;
  errorMessage: string;

  constructor(
    private menuService: MenuService,
    private router: Router
  ) { }

  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imageObj = reader.result.toString();
    }
  }

  submitFormHandler(formValue: { name: string, file: string }) {
    this.loading = true;
    formValue['file'] = this.imageObj;

    this.menuService.createMenu(formValue).subscribe({
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
