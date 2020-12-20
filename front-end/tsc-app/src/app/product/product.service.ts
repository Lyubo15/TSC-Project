import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { IProduct } from './interfaces/product';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    getAllProducts(): Observable<IProduct[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.get<IProduct[]>(`${environment.API_ENDPOINT}/api/product/all`, {
            headers: headers
        });
    }

    createProduct(form: IProduct, menuId: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post(`${environment.API_ENDPOINT}/api/product/create/${menuId}`, form, {
            headers: headers
        });
    }

    // editMenuById(form: IProduct, id: string) {
    //     const headers = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //     });

    //     return this.http.post(`${environment.API_ENDPOINT}/api/menu/edit/${id}`, form, {
    //         headers: headers
    //     });
    // }

    // deleteMenu(id: string) {
    //     const headers = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //     });

    //     return this.http.delete(`${environment.API_ENDPOINT}/api/menu/delete/${id}`, {
    //         headers: headers
    //     });
    // }
}