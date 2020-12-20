import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMenu } from './interfaces/menu';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable()
export class MenuService {

    constructor(private http: HttpClient) { }

    getAllMenus(): Observable<IMenu[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.get<IMenu[]>(`${environment.API_ENDPOINT}/api/menu/all`, {
            headers: headers
        });
    }

    createMenu(form: IMenu) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post(`${environment.API_ENDPOINT}/api/menu/create`, form, {
            headers: headers
        });
    }

    editMenuById(form: IMenu, id: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post(`${environment.API_ENDPOINT}/api/menu/edit/${id}`, form, {
            headers: headers
        });
    }

    deleteMenu(id: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.delete(`${environment.API_ENDPOINT}/api/menu/delete/${id}`, {
            headers: headers
        });
    }

    getAllMenuProducts(id: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.get(`${environment.API_ENDPOINT}/api/menu/${id}/products`, {
            headers: headers
        });
    }
}