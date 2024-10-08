import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private token: string | null = null;


  constructor(private http: HttpClient) {}

  getAllPrescriptions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/prescriptions`);
  }

 // Récupérer toutes les prescriptions
 getPrescriptions(): Observable<any> {
  return this.http.get(`${this.apiUrl}/prescriptions`);
}

// Ajouter une prescription
addPrescription(prescription: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/prescriptions`, prescription);
}

// Récupérer une prescription par ID
getPrescriptionById(id: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/${id}/prescriptions`);
}

// Mettre à jour une prescription
updatePrescription(id: string, prescription: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, prescription);
}

// Supprimer une prescription
deletePrescription(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/prescriptions/${id}`,);
}

  // Méthode pour récupérer les services (nouveau)
  getServices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/services`);
  }

}
