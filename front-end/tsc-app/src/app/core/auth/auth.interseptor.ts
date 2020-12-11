import { Injectable, Provider } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http'
import { exhaustMap, take } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user$.pipe(
            take(1),
            exhaustMap(user => {
                if (!user || !user.token) {
                    return next.handle(req);
                }
                const authReq = req.clone({ headers: req.headers.set('x-access-token', user.token) });
                return next.handle(authReq);
            })
        );
    }
}

export const authInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};