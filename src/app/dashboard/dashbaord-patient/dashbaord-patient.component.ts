import { Component } from '@angular/core';
import { PatientHeaderComponent } from '../../sidebar/patient-header/patient-header.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Chart, LinearScale, CategoryScale, LineController, LineElement, PointElement, Filler, BarController, BarElement, DoughnutController, ArcElement } from 'chart.js';
import { AppointmentService } from '../../services/appointment.service';
import { ChatboxComponent } from '../../chatbox/chatbox.component';
import { Legend } from 'chart.js';
import { InfosPatientComponent } from '../../sidebar/infos-patient/infos-patient.component';

@Component({
  selector: 'app-dashbaord-patient',
  standalone: true,
  imports: [PatientHeaderComponent, CommonModule, FormsModule, RouterLink, ChatboxComponent, InfosPatientComponent], 
  templateUrl: './dashbaord-patient.component.html',
  styleUrls: ['./dashbaord-patient.component.css']
})
export class DashbaordPatientComponent {
  userInfo: any = {};
  appointments: any[] = [];
  isModalOpen: boolean = false;
  chart: any;
  appointmentsStats: any;
  userName: string = '';
  isSidebarOpen: boolean = false;

  constructor(private authService: AuthService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    Chart.register(LinearScale, CategoryScale, LineController, LineElement, PointElement, Filler, BarController, BarElement, DoughnutController, ArcElement, Legend);    this.loadUserInfo();
    this.loadUserAppointmentsStats();
  }
  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  loadUserInfo() {
    this.authService.getUserInfo().subscribe(
      data => {
        if (data && data.data) {
          this.userInfo = data.data;
          this.userName = this.userInfo.name; 
        }
      },
      error => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur');
      }
    );
  }

  loadUserAppointmentsStats() {
    this.appointmentService.getUserAppointmentsStats().subscribe(
      data => {
        if (data && data.status) {
          this.appointmentsStats = data;
          this.createChart();
        }
      },
      error => {
        console.error('Erreur lors de la récupération des statistiques des rendez-vous de l\'utilisateur');
      }
    );
  }
  

  createChart() {
    if (!this.appointmentsStats) return;
  
    const { total_appointments, upcoming_appointments, today_appointments } = this.appointmentsStats;
    const labels = ['Total', 'À venir', 'Aujourd\'hui'];
    const data = [total_appointments, upcoming_appointments, today_appointments];
  
    // Détruire l'ancien graphique s'il existe
    if (this.chart) {
      this.chart.destroy();
    }
  
    // Créer le nouveau graphique en forme de cercle
    this.chart = new Chart('appointmentsChart', {
      type: 'doughnut', // Type du graphique
      data: {
        labels: labels,
        datasets: [{
          label: 'Statistiques des rendez-vous',
          data: data,
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true, // Afficher la légende
            position: 'top', // Position de la légende ('top', 'left', 'bottom', 'right')
            labels: {
              color: '#000', // Couleur du texte de la légende
              font: {
                size: 14 // Taille de la police
              },
              padding: 20 // Espacement autour des étiquettes
            }
          },
          tooltip: {
            enabled: true, // Afficher les tooltips
            callbacks: {
              label: function (context) {
                const label = context.label || '';
                const value = context.raw || 0;
                return `${label}: ${value}`;
              }
            }
          }
        }
      }
    });
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
