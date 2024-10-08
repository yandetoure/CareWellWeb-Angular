import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private token: string | null = null;


  constructor(private http: HttpClient) {}

  getAllExamens(): Observable<any> {
    return this.http.get(`${this.apiUrl}/examens`);
  }

 // Récupérer toutes les prescriptions
 getExamens(): Observable<any> {
  return this.http.get(`${this.apiUrl}/examens`);
}

// Ajouter une prescription
addExam(prescription: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/examens`, prescription);
}

// Récupérer une prescription par ID
getExamById(id: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/${id}/examens`);
}

// Mettre à jour une prescription
updateExam(id: string, exam: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, exam);
}

// Supprimer une prescription
deleteExam(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}/destroy`);
}

  // Méthode pour récupérer les services (nouveau)
  getServices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/services`);
  }
}
