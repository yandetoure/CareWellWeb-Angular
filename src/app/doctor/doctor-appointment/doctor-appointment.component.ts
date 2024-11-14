import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, DoctorSidebarComponent],
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.css']
})
export class DoctorAppointmentComponent implements OnInit {
  appointments: any[] = [];
  selectedAppointment: any;
  isDetailsModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  currentPage: number = 1;
  itemsPerPage = 6; 
  totalPages: number = 1;
  limit: number = 6;
  currentDate: string = '';

  constructor(private appointmentService: AppointmentService, private router: Router) {}



  ngOnInit(): void {
    this.getAppointments();
    this.currentDate = new Date().toISOString().split('T')[0]; 
  }

  get paginatedAppointments() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.appointments.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  getAppointments(page: number = 1): void {
    this.appointmentService.getDoctorAppointments(page, this.limit).subscribe(
      (response) => {
        console.log('Réponse API:', response);  // Vérifiez la structure complète de la réponse
  
        // Vérifiez que 'response.data' contient bien un tableau dans 'data'
        if (response && response.data && response.data.data && Array.isArray(response.data.data)) {
          this.appointments = response.data.data;  // Affectation correcte des rendez-vous
          this.currentPage = response.data.current_page || 1;
          this.totalPages = response.data.last_page || 1;
        } else {
          console.error('Les données des rendez-vous ne sont pas un tableau:', response);
        }
      },
      (error) => {
        console.error('Erreur de l\'API', error);
      }
    );
  }
  
  
  
  

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAppointments(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAppointments(this.currentPage);
    }
  }

  openDetailsModal(appointment: any): void {
    this.selectedAppointment = appointment;
    this.isDetailsModalOpen = true;
  }

  closeDetailsModal(): void {
    this.isDetailsModalOpen = false;
  }

  openEditModal(appointment: any): void {
    this.selectedAppointment = appointment;
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  submitEdit(): void {
    if (this.selectedAppointment) {
      const appointmentDate = new Date(this.selectedAppointment.date);
      if (appointmentDate > new Date()) {
        Swal.fire({
          title: 'Date invalide',
          text: 'La date ne peut pas être dans le futur.',
          icon: 'error'
        });
        return;
      }
      this.updateAppointment();
    }
  }

  updateAppointment(): void {
    this.appointmentService.updateAppointment(this.selectedAppointment.id, this.selectedAppointment).subscribe(
      (response) => {
        if (response.status) {
          Swal.fire('Mis à jour!', 'Le rendez-vous a été mis à jour.', 'success');
          this.getAppointments(this.currentPage);
        } else {
          Swal.fire('Erreur!', 'Le rendez-vous ne peut ´tre changé que 24h avant.', 'error');
        }
      },
      (error) => {
        console.error('Erreur lors de la mise à jour', error);
        Swal.fire('Erreur!', 'Une erreur est survenue.', 'error');
      }
    );
  }

  goToMedicalRecord(userId: number): void {
    this.router.navigate(['/medical-record', userId]);
  }
  
  getAppointmentClass(date: string): string {
    return new Date(date) > new Date() ? 'upcoming' : 'past';
  }
}