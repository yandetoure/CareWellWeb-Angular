import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class DiseasesService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private token: string | null = null;

  constructor(private http: HttpClient) {}
  addDisease(exam: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/medicalexam`, exam);
  }

  getDisease(): Observable<any> {
    return this.http.get(`${this.apiUrl}/diseases`);
  }

getPrescriptionById(id: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/${id}/diseases`);
}
}
