import { Component } from '@angular/core';
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component'; 
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AppointmentService } from '../../services/appointment.service'; 
import { Chart, LinearScale, CategoryScale, LineController, LineElement, PointElement, Filler } from 'chart.js'; // Importer les contrôleurs et échelles nécessaires

// Enregistrer les échelles et le contrôleur de graphique linéaire
Chart.register(LinearScale, CategoryScale, LineController, LineElement, PointElement, Filler);

@Component({
  selector: 'app-dashbaord-doctor',
  standalone: true,
  imports: [DoctorSidebarComponent, CommonModule, FormsModule, RouterLink], 
  templateUrl: './dashbaord-doctor.component.html',
  styleUrls: ['./dashbaord-doctor.component.css'] 
})
export class DashbaordDoctorComponent {
  userInfo: any = {};
  isModalOpen: boolean = false;
  doctorStats: any = {};

  constructor(private authService: AuthService,
              private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadUserInfo();
    this.loadDoctorStats();
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

  openModal() {
    console.log('Bouton "Modifier le profil" cliqué');
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  updateProfile() {
    this.authService.updateUserInfo(this.userInfo).subscribe(
      response => {
        alert('Profil mis à jour avec succès');
        this.closeModal();
        this.loadUserInfo();
      },
      error => {
        console.error('Erreur lors de la mise à jour du profil', error);
      }
    );
  }

  loadDoctorStats() {
    this.appointmentService.getDoctorStats().subscribe(
      (response) => {
        if (response.status) {
          this.doctorStats = response.data; 
          this.createChart();
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des statistiques', error);
      }
    );
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Rendez-vous aujourd\'hui', 'Total des rendez-vous', 'Rendez-vous complétés'], 
        datasets: [{
          label: 'Statistiques des rendez-vous',
          data: [
            this.doctorStats.appointments_today,
            this.doctorStats.total_appointments,
            this.doctorStats.completed_appointments
          ], 
          fill: false, 
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 5,
          tension: 0.5
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
