import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, LoaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [FooterComponent, HeaderComponent, LoaderComponent]
})
export class SharedModule { }
