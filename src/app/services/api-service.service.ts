import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  pageBaseUrl = 'http://localhost:8083/phoneNumber/pageGenerator/';
  constructor(private http: HttpClient,
              private route: ActivatedRoute) { }

  getPaginatedPhoneNumber(phoneNumber: string, page: number): Observable<any> {
    const url = this.pageBaseUrl + phoneNumber + '?page=' + page + '&size=10';
    return this.http.get(url);
  }
}

