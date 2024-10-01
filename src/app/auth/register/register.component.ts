import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Import des formulaires réactifs
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Import nécessaire pour ngModel et reactive forms
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { HttpClientModule } from '@angular/common/http';  // Import pour HttpClient

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],  // Ajoute HttpClientModule ici
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
      const formData = new FormData();
      // Ajoutez chaque champ de votre formulaire à FormData
      Object.keys(this.registerForm.value).forEach(key => {
        formData.append(key, this.registerForm.value[key]);
      });
  
      // Ajoutez le fichier d'image à FormData
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        formData.append('photo', fileInput.files[0]);
      }
  
      this.authService.register(formData).subscribe(
        (response) => {
          console.log(response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      alert('Veuillez remplir le formulaire correctement.');
    }
  }
  
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      // Handle the file as needed (e.g., upload to server or process it)
      console.log(file);
    }
  }
  
}
