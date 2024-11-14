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
      return this.http.get(`${this.apiUrl}/doctor/appointments`);
    }
  
    // Ajouter un nouveau rendez-vous
    addAppointment(appointmentData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/appointments`, appointmentData);
    }
    addUrgentAppointment(appointmentData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/appointment/urgent`, appointmentData);
    }

    deleteAppointment(appointmentId: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/appointments/${appointmentId}`);
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

    getDoctorAppointments(page: number = 1, limit: number = 10): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
  
      // Ajout des paramètres page et limit
      return this.http.get(`${this.apiUrl}/doctor-appointment?page=${page}&limit=${limit}`, { headers });
    }

    
  // getDoctorAppointments(page: number = 1, limit: number = 10): Observable<any> {
  //   return this.http.get(`${this.apiUrl}?page=${page}&limit=${limit}`);
  // }

  updateAppointment(patientId: number, patientData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${patientId}`, patientData);
  }

  updateStatus(appointmentId: number, patientData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put<any>(`${this.apiUrl}/appointments/${appointmentId}/status`, patientData, { headers });
  }
  
  
  updateAppointmentStatus(appointmentId: number, updateData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/appointments/${appointmentId}/status`, updateData);
  }

  getPatientsWithAppointments(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/patient`);
  }

  getPatientsWithAppointmentsDoctor(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/doctor/appointments`);
  }
  getDoctorStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/doctor/stats`);
  }
  getUserAppointmentsStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/statistics`);
  }

  getDoctorStatsForCurrentMonth(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/appointments/current-month`);
  }

  getAvailableSlots(serviceId: string, date: string) {
    return this.http.get<any>(`/api/appointments/available-slots?service_id=${serviceId}&date=${date}`);
}


}
