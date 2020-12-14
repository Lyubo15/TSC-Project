import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { AuthGuard } from './auth/auth.guard'
import { authInterceptorProvider } from './auth/auth.interseptor'
import { AuthService } from './auth/auth.service'
import { LoggedGuard } from './auth/logged.guard';
import { AdminGuard } from './auth/admin.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    AuthGuard,
    LoggedGuard,
    AdminGuard,
    AuthService,
    authInterceptorProvider
  ],
})
export class CoreModule { }
