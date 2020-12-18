import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable()
export class BookService {

    constructor(private http: HttpClient) {
    }

    makeABook(formData: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post(`${environment.API_ENDPOINT}/api/book/make`, formData, {
            headers: headers,
            observe: "response"
        });
    }
}