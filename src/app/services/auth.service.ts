import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import {  BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:8000/api';  // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }

  // Enregistrement d'un utilisateur
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Connexion d'un utilisateur// Exemple de gestion d'erreur pour le login
login(credentials: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, credentials, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }).pipe(
    catchError(this.handleError)
  );
}

// Méthode de gestion d'erreur
private handleError(error: any): Observable<never> {
  // Logique de gestion d'erreur, par exemple :
  console.error('Une erreur est survenue:', error);
  return throwError(() => new Error('Une erreur est survenue lors de la requête'));
}


  // Récupérer les informations du profil
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // Déconnexion de l'utilisateur
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }
}
