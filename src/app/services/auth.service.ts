import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


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
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        console.log('Login response:', response);  // Vérifie la réponse complète
  
        // Vérifie si l'objet user et le role sont présents
        if (response && response.user && response.user.roles && response.user.roles.length > 0) {
          const { token, user } = response;
          const userRole = response.user.roles[0].name || response.user.roles[0];  // Extraire le nom du rôle
  
          console.log('User role:', userRole);  // Vérifie le rôle
  
          this.setToken(token);
          localStorage.setItem('user', JSON.stringify(user));
  
          // Redirige en fonction du rôle
          this.redirectBasedOnRole(userRole);
        } else {
          console.error('Role is undefined or missing in response');
        }
  
        return response;
      })
    );
  }
  
  

  // Méthode pour se déconnecter
  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');  // Supprimer les informations utilisateur
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

  // Méthode pour rediriger selon le rôle de l'utilisateur
  private redirectBasedOnRole(role: string): void {
    switch (role) {
      case 'Admin':
        this.router.navigate(['/dashboard/admin']);
        break;
      case 'Patient':
        this.router.navigate(['/dashboard/patient']);
        break;
      case 'Accountant':
        this.router.navigate(['/accountant-dashboard']);
        break;
      case 'Secretary':
        this.router.navigate(['/secretary-dashboard']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }
}