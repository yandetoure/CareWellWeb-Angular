import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Import des formulaires réactifs
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Import nécessaire pour ngModel et reactive forms
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { HttpClientModule } from '@angular/common/http';  // Import pour HttpClient

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],  
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  addUserForm: FormGroup; // Utilisation d'un FormGroup pour le formulaire

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Initialisation du formulaire avec des validations
    this.addUserForm = this.fb.group({
      first_name: ['', [Validators.required]], // Prénom requis
      last_name: ['', [Validators.required]], // Nom requis
      email: ['', [Validators.required, Validators.email]], // Email requis et format valide
      adress: ['', [Validators.required]], // Adresse requise
      phone_number: ['', [Validators.required]], // Téléphone requis
      day_of_birth: ['', [Validators.required]], // Date de naissance requise
      password: ['', [Validators.required, Validators.minLength(6)]], // Mot de passe requis avec min 6 caractères
      role: ['', [Validators.required]], // Rôle requis (ajoutez cette ligne)
    });
  }

  onAddUser() {
    if (this.addUserForm.valid) {
      const formData = new FormData();
      // Ajoutez chaque champ de votre formulaire à FormData
      Object.keys(this.addUserForm.value).forEach(key => {
        formData.append(key, this.addUserForm.value[key]);
      });
  
      // Ajoutez le fichier d'image à FormData si nécessaire
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        formData.append('photo', fileInput.files[0]);
      }
  
 // Affichez les valeurs du formulaire dans la console pour déboguer
 console.log('Données du formulaire :', this.addUserForm.value);
  
 this.authService.addUser(formData).subscribe(
   (response: any) => {
     console.log('Utilisateur ajouté avec succès', response);
     this.router.navigate(['/users']); // Redirection vers la liste des utilisateurs après ajout
   },
   (error: any) => {
     console.log('Erreur lors de l\'ajout de l\'utilisateur', error);
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
      console.log('Fichier sélectionné :', file);
    }
  }
}
