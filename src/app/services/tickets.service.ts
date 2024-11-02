import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private token: string | null = null;
  constructor(private http: HttpClient, private router: Router) {}

  getTickets(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(`${this.apiUrl}/tickets`, { headers });
  }

  getUserTickets(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(`${this.apiUrl}/user/tickets`, { headers });
  }

addTicket(serviceData: FormData): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  return this.http.post(`${this.apiUrl}/tickets`, serviceData, { headers });
}


  updateTicket(id: number, serviceData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put(`${this.apiUrl}/tickets/${id}`, serviceData, { headers });
  }

  deleteTicket(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete(`${this.apiUrl}/tickets/${id}`, { headers });
  }

  updatePaymentStatus(ticketId: number, isPaid: boolean): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put<any>(`${this.apiUrl}/tickets/${ticketId}`, { is_paid: isPaid });
  }
}

