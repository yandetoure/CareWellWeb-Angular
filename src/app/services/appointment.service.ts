import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://127.0.0.1:8000/api'; // Change avec ton URL backend

  private token: string | null = null;

  constructor(private http: HttpClient) {}

  // Ajouter un token d'autorisation si nécessaire
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }
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



    getAppointment(){
      return this.http.get<any>(this.apiUrl+'/appointments');
    }


    getUserAppointments(): Observable<any> {
      const token = localStorage.getItem('token'); 
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
  
      return this.http.get(`${this.apiUrl}/user/appointments`,{ headers }) ;
    }

  getDoctorAppointments(): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/appointments`,{ headers }) ;
  }


  updateAppointment(patientId: number, patientData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${patientId}`, patientData);
  }

  getPatientsWithAppointments(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/patient`);
  }

  getPatientsWithAppointmentsDoctor(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/doctor/appointments`);
  }
}
