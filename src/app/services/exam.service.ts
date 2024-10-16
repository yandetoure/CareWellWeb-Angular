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

  // Récupérer les examens associés à un dossier médical
  getExams(): Observable<any> {
    return this.http.get(`${this.apiUrl}/exams`);
  }

  // Ajouter un examen à un dossier médical
  addExam(exam: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/medicalexam`, exam);
  }

  // Supprimer un examen d'un dossier médical
  deleteExam(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/medicalexam/${id}`);
  }
}