import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

// Interface pour la réponse de login
interface LoginResponse {
  token: string;
  user: { [key: string]: any }; // Vous pouvez être plus précis selon votre API
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private token: string | null = null;
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(userData: { [key: string]: any }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      catchError(error => {
        console.error('Registration failed', error);
        return of(null); // Handle the error as needed
      })
    );
  }

  // Méthode de connexion
  login(credentials: { email: string; password: string }): Observable<LoginResponse | null> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          this.token = response.token; // Stockage du token
          localStorage.setItem('token', this.token);
          this.tokenSubject.next(this.token); // Mise à jour de l'observable de token
        }
      }),
      catchError(error => {
        console.error('Login failed', error);
        return of(null); // Gérer l'erreur comme nécessaire
      })
    );
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token'); // Récupérer le token en toute sécurité
    return this.http.get(`${this.apiUrl}/profile`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    }).pipe(
      catchError(error => {
        console.error('Profile retrieval failed', error);
        return of(null); // Gérer l'erreur comme nécessaire
      })
    );
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.tokenSubject.next(this.token); // Mise à jour de l'observable de token
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }
}
