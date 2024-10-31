import { Component } from '@angular/core';
import { PatientHeaderComponent } from '../../sidebar/patient-header/patient-header.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Chart, LinearScale, CategoryScale, LineController, LineElement, PointElement, Filler } from 'chart.js'; // Importer les contrôleurs et échelles nécessaires
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-dashbaord-patient',
  standalone: true,
  imports: [PatientHeaderComponent, CommonModule, FormsModule, RouterLink], 
  templateUrl: './dashbaord-patient.component.html',
  styleUrls: ['./dashbaord-patient.component.css'] // Corrigez `styleUrl` en `styleUrls`
})
export class DashbaordPatientComponent {
  userInfo: any = {};
  appointments: any[] = [];
  isModalOpen: boolean = false;
  chart: any;
  appointmentsStats: any;

  constructor(private authService: AuthService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.loadUserInfo();
   this.loadUserAppointmentsStats();  
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

  loadUserAppointmentsStats() {
    this.appointmentService.getUserAppointmentsStats().subscribe(
      data => {
        if (data && data.status) {
          this.appointmentsStats = data; // Stockez les statistiques ici
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

    // Assurez-vous de détruire le graphique précédent si nécessaire
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('appointmentsChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Statistiques des rendez-vous',
          data: data,
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'], // Couleurs personnalisées
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
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
