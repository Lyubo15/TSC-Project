import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { IJob } from './interfaces/job';
import { Observable } from 'rxjs';

@Injectable()
export class CareerService {

    constructor(private http: HttpClient, private router: Router) {
    }

    createCareer(formData: IJob) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post(`${environment.API_ENDPOINT}/api/career/create`, formData, {
            headers: headers,
            observe: "response"
        });
    }

    getAllCareers(): Observable<IJob[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.get<IJob[]>(`${environment.API_ENDPOINT}/api/career/all`, {
            headers: headers,
        });
    }

    getCareerById(id: string): Observable<IJob> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.get<IJob>(`${environment.API_ENDPOINT}/api/career/details/${id}`, {
            headers: headers
        });
    }

    deleteCareerById(id: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.delete(`${environment.API_ENDPOINT}/api/career/delete/${id}`, {
            headers: headers
        });
    }
}