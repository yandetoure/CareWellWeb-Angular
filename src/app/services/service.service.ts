// src/app/service-management/service.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private token: string | null = null;
  constructor(private http: HttpClient, private router: Router) {}

  // Méthode pour récupérer les services
  getServices(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(`${this.apiUrl}/services`, { headers });
  }

  // Méthode pour ajouter un service
 // src/app/service-management/service.service.ts

addService(serviceData: FormData): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  return this.http.post(`${this.apiUrl}/services`, serviceData, { headers });
}


  // Méthode pour mettre à jour un service
  updateService(id: number, serviceData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put(`${this.apiUrl}/services/${id}`, serviceData, { headers });
  }

  // Méthode pour supprimer un service
  deleteService(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete(`${this.apiUrl}/services/${id}`, { headers });
  }
}
