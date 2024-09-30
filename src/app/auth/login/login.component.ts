import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import nécessaire pour ngModel
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { HttpClientModule } from '@angular/common/http';  // Import pour HttpClient

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule],

})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Vous etes connecte:', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Une erreur est survenue lors de la connexion :', error);
      }
    });
  }
  
}
