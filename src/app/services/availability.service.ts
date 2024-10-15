import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private apiUrl = 'http://127.0.0.1:8000/api'; 
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  getAvailabilities(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/doctor/availability`);
  }

  addAvailability(availability: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<any>(`${this.apiUrl}/availabilities`, availability, { headers });
  }

  getAvailabilityByDoctorAndService(doctorId: number, serviceId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${doctorId}/${serviceId}`);
  }

    getServiceByDoctor(doctorId: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/doctor/${doctorId}/service`);
    }
  
    getAuthenticatedDoctorDetails(): Observable<any> {
      return this.http.get(`${this.apiUrl}/doctor/details`);
    }

    addAvailabilitySelf(availability: any): Observable<any> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      return this.http.post<any>(`${this.apiUrl}/availability`, availability, { headers });
    }
}
