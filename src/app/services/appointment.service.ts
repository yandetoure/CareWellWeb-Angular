import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    const token = localStorage.getItem('token'); // Supposons que le token est stocké dans localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
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

    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('auth_token'); 
      if (token) {
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
      } else {
        console.error('Token non trouvé');
        return new HttpHeaders();
      }
    }

    getAppointment(){
      return this.http.get<any>(this.apiUrl+'/appointments');
    }


      // Méthode pour récupérer les rendez-vous du docteur connecté
  getDoctorAppointments(): Observable<any> {
    const token = localStorage.getItem('token'); // Récupère le token si nécessaire
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // En-tête d'autorisation si besoin
    });

    return this.http.get(`${this.apiUrl}/appointments`,{ headers }) ;
  }


  updateAppointment(appointment: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${appointment.id}`, appointment);
  }

  getPatientsWithAppointments(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/patient`);
  }
}
