import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private apiUrl = 'http://127.0.0.1:8000/api/availabilities'; // Change avec ton URL backend

  constructor(private http: HttpClient) { }

  // Récupérer les disponibilités des médecins
  getAvailabilities(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Ajouter une disponibilité
  addAvailability(availability: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, availability);
  }

  // Récupérer les disponibilités spécifiques pour un médecin et un service
  getAvailabilityByDoctorAndService(doctorId: number, serviceId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${doctorId}/${serviceId}`);
  }
}
