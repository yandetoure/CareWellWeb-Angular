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

  // Ajouter une note au dossier médical
  addNote(medicalFileId: number, note: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/medicalfile/${medicalFileId}/note`, 
    { content: note }, 
    { headers: this.getHeaders() });
  }

  // Ajouter une prescription au dossier médical
  addPrescription(medicalFileId: number, prescription: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/medicalfile/${medicalFileId}/prescription`, 
    { content: prescription }, 
    { headers: this.getHeaders() });
  }

  // Ajouter un examen au dossier médical
  addExam(medicalFileId: number, exam: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/medicalfile/${medicalFileId}/exam`, 
    { description: exam }, 
    { headers: this.getHeaders() });
  }

  // Récupérer tous les dossiers médicaux
  getMedicalFiles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/medicalfiles`, { headers: this.getHeaders() });
  }

  // Récupérer un dossier médical spécifique
  getMedicalFile(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/medicalfiles/${id}`, { headers: this.getHeaders() });
  }
}
