import { Component, HostListener } from '@angular/core';
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component'; 
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AppointmentService } from '../../services/appointment.service'; 
import { Chart, LinearScale, CategoryScale, LineController, LineElement, PointElement, Filler, PieController,  ArcElement, Legend, Tooltip, BarController, BarElement } from 'chart.js'; // Importer les contrôleurs et échelles nécessaires
// Enregistrer les échelles et le contrôleur de graphique linéaire
Chart.register(LinearScale, CategoryScale, LineController, LineElement, PointElement, Filler,   PieController, ArcElement, Legend, Tooltip, BarController, BarElement);

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
  isExpanded = false;


  constructor(private authService: AuthService,
              private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadUserInfo();
    this.loadDoctorStats();
  }
 

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isExpanded = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isExpanded = false;
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
          this.createPieChart();
          this.createLineChart();
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
      type: 'doughnut',
      data: {
        labels: ['Total des rendez-vous du jour', 'Rendez-vous aujourd\'hui', 'Rendez-vous complétés', 'Rendez-vous annulés'], 
        datasets: [{
          label: 'Statistiques des rendez-vous',
          data: [
            this.doctorStats.appointments_today,
            this.doctorStats.total_appointments_for_month, 
            this.doctorStats.completed_appointments_for_month,
            this.doctorStats.cancelled_appointments_for_month
          ], 
          backgroundColor: [
            'rgb(250, 177, 47, 0.5)',
            'rgba(255, 99, 132, 0.2)',
            'rgb(31, 69, 41, 0.5)',
            'rgb(255, 41, 41)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            enabled: true
          }
        }
      }
    });
  }
  
  

  createPieChart() {
    const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;
    
    // Obtenir la date actuelle
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; 
    const currentDay = currentDate.getDate();
  
    // Récupérer les données spécifiques à l'année, au mois et au jour
    const appointmentsCancelled = this.doctorStats?.cancelled_appointments_for_month || 0;
    const appointmentsCompleted = this.doctorStats?.completed_appointments_for_month || 0;
    const appointmentsMonth = this.doctorStats?.total_appointments_for_month || 0; 
    const appointmentsToday = this.doctorStats?.appointments_today || 0; 
  
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Année actuelle', 'Mois actuel', 'Rendez-vous annulés', 'Rendez-vous complétés'], 
        datasets: [{
          label: 'Statistiques de date',
          data: [
            currentYear,
            appointmentsMonth, 
            appointmentsCancelled,
            appointmentsCompleted,
          ],
          backgroundColor: [
            'rgb(166, 174, 191)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)', 
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)', 
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            enabled: true
          }
        }
      }
    });
  }
  
  

  
  createLineChart() {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    const lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Rendez-vous du jour', 'Rendez-vous complétés', 'Rendez-vous annulés'],
        datasets: [{
          label: 'Rendez-vous (Jour vs Complétés vs Annulés)',
          data: [
            this.doctorStats.appointments_today,
            this.doctorStats.appointments_completed_today,
            this.doctorStats.appointments_cancelled_today
          ],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 3,
          tension: 0.4,
          pointBackgroundColor: 'rgba(54, 162, 235, 1)',
          pointRadius: 5,
          pointHoverRadius: 7,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleColor: 'white',
            bodyColor: 'white',
            footerColor: 'white',
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuad'
        }
      }
    });
  }
  
  
  
}

