import { Component } from '@angular/core';
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component'; // Assurez-vous que le chemin est correct
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import nécessaire pour ngModel




@Component({
  selector: 'app-dashbaord-doctor',
  standalone: true,
  imports: [DoctorSidebarComponent, CommonModule, FormsModule], 
  templateUrl: './dashbaord-doctor.component.html',
  styleUrls: ['./dashbaord-doctor.component.css'] 
})

export class DashbaordDoctorComponent {
  userInfo: any = {};
  isModalOpen: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.authService.getUserInfo().subscribe(
      data => {
        if (data && data.data) {
          this.userInfo = data.data;
        }
      },
      error => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur');
      }
    );
  }


   // Ouvrir le modal
   openModal() {
    console.log('Bouton "Modifier le profil" cliqué');
    this.isModalOpen = true;
  }
  

  // Fermer le modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Méthode pour mettre à jour les informations du profil
  updateProfile() {
    this.authService.updateUserInfo(this.userInfo).subscribe(
      response => {
        alert('Profil mis à jour avec succès');
        this.closeModal();
        this.loadUserInfo(); // Recharger les informations après la mise à jour
      },
      error => {
        console.error('Erreur lors de la mise à jour du profil', error);
      }
    );
  }
}
