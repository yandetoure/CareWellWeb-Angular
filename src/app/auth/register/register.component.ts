import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import nécessaire pour ngModel
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { HttpClientModule } from '@angular/common/http';  // Import pour HttpClient

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],  // Ajoute HttpClientModule ici
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    first_name: '',
    last_name: '',
    email: '',
    adress: '',
    phone_number: '',
    day_of_birth: '',
    password: '',
    service_id: null,
  };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.user).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/profloginile']); // Redirige vers la page de connexion
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
