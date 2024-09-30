import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  // Méthode pour s'inscrire
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Méthode pour se connecter
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Méthode pour se déconnecter
  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // Redirection vers la page de connexion
  }

  // Méthode pour récupérer le profil de l'utilisateur
  getProfile(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }

  // Méthode pour stocker le token
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // Méthode pour récupérer le token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
