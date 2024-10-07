
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services//appointment.service'; 
import { FormsModule } from '@angular/forms';  // Import nécessaire pour ngModel
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { HttpClientModule } from '@angular/common/http';  // Import pour HttpClient
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component'; // Assurez-vous que le chemin est correct



@Component({
  selector: 'app-doctor-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, DoctorSidebarComponent],
  templateUrl: './doctor-appointment.component.html',
  styleUrl: './doctor-appointment.component.css'
})
export class DoctorAppointmentComponent {
  appointments: any[] = []; // Stocker les rendez-vous
  selectedAppointment: any; // Le rendez-vous sélectionné pour les détails ou l'édition

  isDetailsModalOpen: boolean = false; // État du modal de détails
  isEditModalOpen: boolean = false; // État du modal d'édition

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.getAppointments(); // Récupérer les rendez-vous dès le chargement du composant
  }

  getAppointments(): void {
    this.appointmentService.getDoctorAppointments().subscribe(
      (response) => {
        if (response.status) {
          this.appointments = response.data; // Récupérer les rendez-vous de la réponse
        } else {
          console.error('Erreur : ', response.message);
        }
      },
      (error) => {
        console.error('Erreur de l\'API', error);
      }
    );
  }


  // Fonction pour déterminer la classe CSS en fonction de la date du rendez-vous
  getAppointmentClass(appointmentDate: string): string {
    const today = new Date();
    const appointment = new Date(appointmentDate);

    if (appointment < today) {
      return 'past-appointment'; // Rendez-vous passé
    } else if (appointment.getTime() - today.getTime() < 3 * 24 * 60 * 60 * 1000) {
      return 'near-appointment'; // Rendez-vous proche (dans 3 jours)
    } else {
      return 'upcoming-appointment'; // Rendez-vous futur
    }
  }

  // Ouvrir le modal de détails
  openDetailsModal(appointment: any): void {
    this.selectedAppointment = appointment;
    this.isDetailsModalOpen = true;
  }

  // Fermer le modal de détails
  closeDetailsModal(): void {
    this.isDetailsModalOpen = false;
  }

  // Ouvrir le modal d'édition
  openEditModal(appointment: any): void {
    this.selectedAppointment = appointment;
    this.isEditModalOpen = true;
  }

  // Fermer le modal d'édition
  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  // Soumettre les modifications du rendez-vous
  submitEdit(): void {
    // Ajouter la logique pour enregistrer les modifications du rendez-vous
    console.log('Rendez-vous modifié:', this.selectedAppointment);
    this.closeEditModal();
  }
}


