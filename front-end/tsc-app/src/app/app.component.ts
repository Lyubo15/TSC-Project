import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'TSC';

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    sessionStorage.getItem('isUserEnterForFirstTime') === null ? this.authService.autoLogin(true) : this.authService.autoLogin(false);
    sessionStorage.setItem('isUserEnterForFirstTime', "true");
  }
}
