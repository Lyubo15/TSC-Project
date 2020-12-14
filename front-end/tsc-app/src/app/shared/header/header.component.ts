import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

   isLogged = this.authService.isLogged$;

  constructor(private authService: AuthService) {
  }

  logoutHandler(){
    this.authService.logout();
  }
}
