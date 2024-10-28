import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalFileService {
  private apiUrl = 'http://127.0.0.1:8000/api';
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

  addNote(id: string, note: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/medical-files/${id}/addnote`, note)
  }
  addDisease(id: string, disease: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/medical-files/${id}/adddisease`, disease)
  }
  // Ajouter un antécédent
  addHistory(id: string, history: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/medical-files/${id}/addHistory`, history)
  }

  // Ajouter une prescription
  addPrescription(id: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/medical-files/${id}/addprescription`, data, { headers: this.getHeaders() });
  }

  // Ajouter un examen médical
  addExam(id: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/medical-files/${id}/addexam`, data, { headers: this.getHeaders() });
  }

  // Récupérer tous les dossiers médicaux
  getMedicalFiles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/medicalfiles`, { headers: this.getHeaders() });
  }

  // Récupérer un dossier médical spécifique
  getMedicalFileById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/medicalfiles/${id}`, { headers: this.getHeaders() });
  }
  
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`, { headers: this.getHeaders() });
  }

  getUserMedicalFile(): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/user/medicalfileshow/{id}`,{ headers });
  }
  
}
