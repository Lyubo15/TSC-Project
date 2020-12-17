import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { RouterModule } from '@angular/router';
import { CareerModule } from '../career/career.module';

@NgModule({
  declarations: [HomeComponent, AboutUsComponent, ContactComponent],
  imports: [
    CommonModule,
    RouterModule,
    CareerModule,
  ],
  exports: [HomeComponent, AboutUsComponent]
})
export class HomeModule { }
