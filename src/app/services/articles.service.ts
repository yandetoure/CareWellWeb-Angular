import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  private token: string | null = null; // Optionnel : à définir si vous utilisez une authentification

  constructor(private http: HttpClient, private router: Router) {}

  // Méthode pour récupérer les services
  getArticles(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(`${this.apiUrl}/articles`, { headers });
  }

  // Méthode pour ajouter un service
 // src/app/service-management/service.service.ts

addArticle(articleData: FormData): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  return this.http.post(`${this.apiUrl}/articles`, articleData, { headers });
}


  // Méthode pour mettre à jour un service
  updateArticle(id: number, articleData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put(`${this.apiUrl}/articles/${id}`, articleData, { headers });
  }

  // Méthode pour supprimer un service
  deleteArticle(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers });
  }


  getArticleById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/articles/${id}`);
  }
  
}
