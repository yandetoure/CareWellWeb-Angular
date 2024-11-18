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
        console.log('Login response:', response);
  
        // Vérifie si l'objet user et le role sont présents
        if (response && response.user && response.user.roles && response.user.roles.length > 0) {
          const { access_token, user } = response;
          const userRole = response.user.roles[0].name || response.user.roles[0];
  
          console.log('User role:', userRole); 
  
          this.setToken(access_token);
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
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getProfile(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(`${this.apiUrl}//profile/update`, { headers });
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private redirectBasedOnRole(role: string): void {
    switch (role) {
      case 'Admin':
        this.router.navigate(['/dashboard/admin']);
        break;
      case 'Patient':
        this.router.navigate(['/dashboard/patient']);
        break;
        case 'Doctor':
          this.router.navigate(['/dashboard/doctor']);
          break;
      case 'Accountant':
        this.router.navigate(['/dashboard/accountant']);
        break;
      case 'Secretary':
        this.router.navigate(['/dashboard/secretary']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`).pipe(
      map((response: any) => response.data)
    );
  }
  
  getUserId(): number {
    return parseInt(localStorage.getItem('userId') || '0', 10);
  }

    getUserInfo(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/profile`, { headers: this.getHeaders() });
    }
    
    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');       
      if (token) {
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
      } else {
        console.error('Token non trouvé');
        return new HttpHeaders();
      }
    }

      // Méthode pour mettre à jour les informations du profil
  updateUserInfo(userInfo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/update`, userInfo);
    }
    
    
    // // Méthode pour récupérer l'utilisateur connecté
    // getUser(): Observable<any> {
    //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    //   return this.http.get<any>(`${this.apiUrl}/user`); // Utilise l'API backend pour récupérer l'utilisateur
    // }



    addUser(userData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/add-user`, userData);
    }

    //Supprimer un utilisateur
    deleteUser(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/delete/${id}`);
    }

    // Mettre à jour un utilisateur
    // updateUser(userData: any): Observable<any> {
    //   return this.http.put(`${this.apiUrl}/update-user`, userData);
    // }

    getStatistics(): Observable<any> {
      return this.http.get(`${this.apiUrl}/user/statistics`).pipe(
        map((response: any) => response.data) 
      );
    }
}