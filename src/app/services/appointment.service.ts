import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://127.0.0.1:8000/api'; // Change avec ton URL backend

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

    // Récupérer tous les rendez-vous
    getAppointments(): Observable<any> {
      return this.http.get(`${this.apiUrl}/appointments`);
    }
  
    // Ajouter un nouveau rendez-vous
    addAppointment(appointmentData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/appointments`, appointmentData);
    }
}
