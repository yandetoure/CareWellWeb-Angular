import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Import des formulaires réactifs
import { FormsModule } from '@angular/forms';  // Import nécessaire pour ngModel
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { HttpClientModule } from '@angular/common/http';  // Import pour HttpClient

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule, FormBuilder],  // Ajoute HttpClientModule ici
})
export class RegisterComponent {
  registerForm: FormGroup; // Utilisation d'un FormGroup pour le formulaire

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Initialisation du formulaire avec des validations
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required]], // Prénom requis
      last_name: ['', [Validators.required]], // Nom requis
      email: ['', [Validators.required, Validators.email]], // Email requis et format valide
      adress: ['', [Validators.required]], // Adresse requise
      phone_number: ['', [Validators.required]], // Téléphone requis
      day_of_birth: ['', [Validators.required]], // Date de naissance requise
      password: ['', [Validators.required, Validators.minLength(6)]], // Mot de passe requis avec min 6 caractères
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          console.log(response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/login']); // Redirige vers la page du profil
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      // Affiche une alerte si le formulaire n'est pas valide
      alert('Veuillez remplir le formulaire correctement.');
    }
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
