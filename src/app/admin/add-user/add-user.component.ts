import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Import des formulaires réactifs
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Import nécessaire pour ngModel et reactive forms
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { HttpClientModule } from '@angular/common/http';  // Import pour HttpClient
import { AdminSidebarComponent } from '../../sidebar/admin-sidebar/admin-sidebar.component';
import { ServiceService } from '../../services/service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, AdminSidebarComponent],  
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  addUserForm: FormGroup; // Utilisation d'un FormGroup pour le formulaire
  services: any[] = [];

  constructor(private fb: FormBuilder,
     private authService: AuthService, 
    private router: Router,
  private serviceService: ServiceService){
    // Initialisation du formulaire avec des validations
    this.addUserForm = this.fb.group({
      first_name: ['', [Validators.required]], 
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      adress: ['', [Validators.required]], 
      phone_number: ['', [Validators.required]],
      day_of_birth: ['', [Validators.required]], 
      password: ['', [Validators.required, Validators.minLength(6)]], 
      role: ['', [Validators.required]], 
      service_id: ['', []],
      // service_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getServices(); // Récupérer les services au chargement du composant
  }



  getServices() {
    this.serviceService.getServices().subscribe(
      (response) => {
        this.services = response.data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de récupérer les services.',
        });
      }
    );
  }



  onAddUser() {
    if (this.addUserForm.valid) {
      const formData = new FormData();
      
      Object.keys(this.addUserForm.value).forEach(key => {
        formData.append(key, this.addUserForm.value[key]);
      });
  
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        formData.append('photo', fileInput.files[0]);
      }
  
      console.log('Données du formulaire :', this.addUserForm.value);
  
      this.authService.addUser(formData).subscribe(
        (response: any) => {
          console.log('Utilisateur ajouté avec succès', response);
          
          // Réinitialiser le formulaire
          this.addUserForm.reset();
  
          // Afficher l'alerte de succès
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Utilisateur ajouté avec succès !',
          });
          },
        (error: any) => {
          console.log("Erreur lors de l'ajout de l'utilisateur", error);
          
          // Afficher une alerte d'erreur
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: "Erreur lors de l'ajout de l'utilisateur",
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Attention',
        text: 'Veuillez remplir le formulaire correctement.',
      });
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
