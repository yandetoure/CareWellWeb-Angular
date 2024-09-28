import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule] 
})
export class RegisterComponent {

  user = {
    first_name: '',
    last_name: '',
    email: '',
    adress: '',
    phone_number: '',
    day_of_birth: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('Enregistré avec succès:', response);
        localStorage.setItem('token', response.token); // Stocker le token
        this.router.navigate(['/dashboard']); // Rediriger après enregistrement
      },
      error: (error) => {
        console.error('Erreur d\'inscription:', error);
      }
    });
  }
}
