import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserAuthModel } from '../../user/models/user.model'
import { environment } from '../../../environments/environment'
import { map, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthService {

    private _user: BehaviorSubject<UserAuthModel | null> = new BehaviorSubject(undefined);
    user$ = this._user.asObservable();
    isLogged$ = this.user$.pipe(map(user => !!user));
    isUserAnAdmin$ = this.user$.pipe(map(user => { if (user) { return user.role === 'ADMIN' } }))

    constructor(private http: HttpClient, private router: Router) {
    }

    register(formData: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post(`${environment.API_ENDPOINT}/api/auth/register`, formData, {
            headers: headers,
            observe: "response"
        });
    }

    signin(formData: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post(`${environment.API_ENDPOINT}/api/auth/signin`, formData, {
            headers: headers,
            observe: "response"
        });
    }

    autoLogin(isUserEnterForFirstTime: boolean) {
        const userData: {
            userId: string,
            role: string,
            firstName: string,
            rememberMe: boolean,
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem(environment.USER_INFO_KEY));

        if (!userData) { return; }

        // If user get in website for first time will check
        // whether user is clicked remember me when registered/logged
        // and if user has clicked it will authenticate auto 

        if (isUserEnterForFirstTime) {
            if (!userData.rememberMe) {
                this.logout();
                return;
            }
        }

        const loadedUser = new UserAuthModel(
            userData.userId,
            userData.role,
            userData.firstName,
            userData.rememberMe,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            this._user.next(loadedUser);
            if (new Date(userData._tokenExpirationDate) < new Date()) {
                this.logout();
                return;
            }
        }
    }

    logout() {
        this._user.next(null);
        this.router.navigate(['/']);
        localStorage.removeItem(environment.USER_INFO_KEY);
    }

    authentication(token: string, rememberMe: boolean) {
        const data = JSON.parse(atob((token.replace('Bearer: ', '').split('.')[1])));
        const firstName = data.firstName;
        const userId = data.userId;
        const userRole = data.role;

        const expirationDate = new Date(new Date().getTime() + 863940000);

        const user = new UserAuthModel(userId, userRole, firstName, rememberMe, token, expirationDate);
        this._user.next(user);
        localStorage.setItem(environment.USER_INFO_KEY, JSON.stringify(user));
    }

    // authenticateCurrentUser(): Observable<any> {
    //     const headers = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //     });

    //     return this.http.get(`${environment.API_ENDPOINT}/api/auth/authenticate`, {
    //         headers: headers,
    //     })
    //         .pipe(
    //             tap((user: UserAuthModel) => {
    //                 this._user.next(user)
    //             }),
    //             catchError(() => {
    //                 this._user.next(null);
    //                 return [null];
    //             })
    //         );
    // }
}