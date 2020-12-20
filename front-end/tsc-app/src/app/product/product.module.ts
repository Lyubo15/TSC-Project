import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product/create-product.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { RouterModule } from '@angular/router';
import { ProductService } from './product.service';



@NgModule({
  declarations: [CreateProductComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ProductRoutingModule
  ],
  providers: [ProductService]
})
export class ProductModule { }
