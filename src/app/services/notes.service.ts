import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private token: string | null = null;


  constructor(private http: HttpClient) {}



  addNote(note: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<any>(`${this.apiUrl}/note`, note, { headers });
  }
}
