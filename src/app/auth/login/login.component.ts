import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule] 
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('Tentative de connexion avec:', this.credentials);
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Connexion réussie:', response);
        localStorage.setItem('token', response.token); // Stocker le token

        // Redirection selon le rôle
        const role = response.user.role; // Assurez-vous que la réponse contient cette information

        switch (role) {
          case 'patient':
            this.router.navigate(['/user/dashboard']);
            break;
          case 'doctor':
            this.router.navigate(['/doctor/dashboard']);
            break;
          case 'accountant':
            this.router.navigate(['/accountant/dashboard']);
            break;
          default:
            this.router.navigate(['/home']); // Redirection par défaut
            break;
        }
      },
      error: (error) => {
        console.error('Erreur de connexion:', error);
        alert('Échec de la connexion : ' + error.message); // Alerte d'erreur utilisateur
      }
    });
  }
}
