import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../core/auth/auth.service';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [SigninComponent, RegisterComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    UserRoutingModule
  ],
  providers: [AuthService]
})
export class UserModule { }