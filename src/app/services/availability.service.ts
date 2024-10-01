// availability.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private baseUrl = 'http://127.0.0.1:8000/api/availabilities'; // Remplacez par l'URL de votre API
  private servicesUrl = 'http://127.0.0.1:8000/api/services'; // Remplacez par l'URL de votre API pour les services

  constructor(private http: HttpClient, private router: Router) {}

  // Méthode pour ajouter une disponibilité
  addAvailability(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  // Méthode pour obtenir les disponibilités
  getAvailabilities(doctorId: number, serviceId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/show/${doctorId}/${serviceId}`);
  }

  // Méthode pour obtenir la liste des services
  getServices(): Observable<any> {
    return this.http.get(this.servicesUrl);
  }

  // availability.service.ts
getAvailabilitiesByDoctor(doctorId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/doctor/${doctorId}`);
}

}
