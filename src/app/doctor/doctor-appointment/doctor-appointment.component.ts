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
  isModalOpen: boolean = false;
  isDetailsModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  today: string = new Date().toISOString().split('T')[0]; // Date du jour au format YYYY-MM-DD

  constructor(private appointmentService: AppointmentService, private router: Router) {}

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
    this.appointmentService.getDoctorAppointments().subscribe(
      (response) => {
        if (response.status) {
          this.appointments = response.data;
        } else {
          console.error('Erreur : ', response.message);
        }
      },
      (error) => {
        console.error('Erreur de l\'API', error);
      }
    );
  }

  getAppointmentClass(appointmentDate: string): string {
    const today = new Date();
    const appointment = new Date(appointmentDate);

    if (appointment < today) {
      return 'past-appointment';
    } else if (appointment.getTime() - today.getTime() < 3 * 24 * 60 * 60 * 1000) {
      return 'near-appointment';
    } else {
      return 'upcoming-appointment';
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

  goToMedicalRecord(userId: number) {
    this.router.navigate(['/doctor/medicalfile', userId]);
  }

  submitEdit(): void {
    if (this.selectedAppointment) {
      const appointmentDate = new Date(this.selectedAppointment.date);
      const todayDate = new Date();

      if (appointmentDate > todayDate) {
        Swal.fire({
          title: 'Date invalide',
          text: 'La date de rendez-vous ne peut pas être ultérieure à la date du jour.',
          icon: 'error'
        });
        return;
      }

      this.updatePatientConfirmed(this.selectedAppointment);
    }
    this.closeEditModal();
  }

  updatePatientConfirmed(appointment: any): void {
    const appointmentDate = new Date(appointment.appointment_date);
    const now = new Date();
    const timeDifference = appointmentDate.getTime() - now.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference < 24) {
      Swal.fire({
        title: 'Impossible de modifier',
        text: "Vous ne pouvez pas modifier ce rendez-vous moins de 24 heures avant la date prévue.",
        icon: 'error'
      });
      return;
    }

    Swal.fire({
      title: 'Confirmation',
      text: "Êtes-vous sûr de vouloir mettre à jour le rendez-vous ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, mettre à jour',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = {
          is_visited: appointment.is_visited,
          appointment_date: appointment.appointment_date,
          appointment_time: appointment.appointment_time,
        };

        this.appointmentService.updateAppointment(appointment.id, updatedData).subscribe(
          (response: any) => {
            if (response.status) {
              Swal.fire('Mis à jour!', 'Rendez-vous mis à jour avec succès.', 'success');
              this.getAppointments();
            } else {
              Swal.fire('Erreur!', 'Erreur lors de la mise à jour du rendez-vous : ' + response.message, 'error');
            }
          },
          (error) => {
            console.error("Erreur lors de la mise à jour du rendez-vous :", error);
            Swal.fire('Erreur!', 'Une erreur est survenue lors de la mise à jour du rendez-vous.', 'error');
          }
        );
      }
    });
  }
}
