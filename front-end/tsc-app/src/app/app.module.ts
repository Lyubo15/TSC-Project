import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app-routing.module'
import { SharedModule } from './shared/shared.module'
import { CoreModule } from './core/core.module'

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { CareerModule } from './career/career.module';
import { RestaurantModule } from './restaurant/restaurant.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    SharedModule,
    UserModule,
    CareerModule,
    RestaurantModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class AppModule { }
