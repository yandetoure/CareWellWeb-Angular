import { Component, OnInit } from '@angular/core';
import { AdminSidebarComponent } from '../../sidebar/admin-sidebar/admin-sidebar.component'; 
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-dashbaord-admin',
  standalone: true,
  imports: [AdminSidebarComponent, CommonModule, FormsModule, RouterLink], 
  templateUrl: './dashbaord-admin.component.html',
  styleUrls: ['./dashbaord-admin.component.css'] 
})
export class DashbaordAdminComponent implements OnInit {
  userInfo: any = {};
  isModalOpen: boolean = false;
  userStatistics: any = {};

  constructor(private authService: AuthService, private http: HttpClient, private cd: ChangeDetectorRef) {} // Injection de HttpClient

  ngOnInit() {
    this.loadUserInfo(); 
    this.loadUserStatistics();
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

  // Méthode pour récupérer les statistiques des utilisateurs

  loadUserStatistics() {
    this.authService.getStatistics().subscribe(
      response => {
        console.log('Statistiques récupérées:', response);
        if (response && response.status) {
          this.userStatistics = response.data;
          this.cd.detectChanges();  // Force Angular à vérifier les changements
        }
      },
      error => {
        console.error('Erreur lors de la récupération des statistiques des utilisateurs', error);
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
