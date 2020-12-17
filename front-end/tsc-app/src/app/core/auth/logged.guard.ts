import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class LoggedGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.authService.user$.pipe(
            take(1),
            map(user => {
                const isAuth = !!user;
                if (!isAuth) { return true; }
                const url = this.router.url;
                this.router.navigateByUrl(url);
            })
        )
    }
}