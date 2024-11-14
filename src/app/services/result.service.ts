import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private token: string | null = localStorage.getItem('auth_token'); 

  constructor(private http: HttpClient) { }

  getResultById(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(`${this.apiUrl}/results/${id}`, { headers });
  }
  addResultToExam(examId: number, formData: FormData) {
    return this.http.post(`${this.apiUrl}/exam/${examId}/results`, formData);
  }

}