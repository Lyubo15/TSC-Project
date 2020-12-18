import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IRestourant } from './interfaces/restourant';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable()
export class RestaurantService {

    constructor(private http: HttpClient) { }

    getAllRestaurants(): Observable<IRestourant[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.get<IRestourant[]>(`${environment.API_ENDPOINT}/api/restaurant/all`, {
            headers: headers
        });
    }

    createRestaurant(form: IRestourant) {
        debugger
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post(`${environment.API_ENDPOINT}/api/restaurant/create`, form, {
            headers: headers
        });
    }

    editRestourantById(form: IRestourant, id: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post(`${environment.API_ENDPOINT}/api/restaurant/edit/${id}`, form, {
            headers: headers
        });
    }

    getRestaurantById(id: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.get(`${environment.API_ENDPOINT}/api/restaurant/${id}`, {
            headers: headers
        });
    }

    deleteRestaurant(id: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.delete(`${environment.API_ENDPOINT}/api/restaurant/delete/${id}`, {
            headers: headers
        });
    }
}