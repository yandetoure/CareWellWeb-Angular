import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service'; 
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  
import { HttpClientModule } from '@angular/common/http'; 
import { Router } from '@angular/router';
import { PatientHeaderComponent } from '../../sidebar/patient-header/patient-header.component';

@Component({
  selector: 'app-user-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, PatientHeaderComponent],
  templateUrl: './user-appointment.component.html',
  styleUrl: './user-appointment.component.css'
})
export class UserAppointmentComponent implements OnInit {
  appointments: any[] = []; 
  selectedAppointment: any; 

  isDetailsModalOpen: boolean = false; 
  isEditModalOpen: boolean = false; 

  constructor(
    private appointmentService: AppointmentService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.getAppointments(); 
  }

  getAppointments(): void {
    this.appointmentService.getUserAppointments().subscribe(
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

  submitEdit(): void {
    if (this.selectedAppointment) {
      this.appointmentService.updateAppointment(this.selectedAppointment.id, this.selectedAppointment)
        .subscribe(
          (response) => {
            console.log('Rendez-vous mis à jour avec succès:', response);
            this.getAppointments();  
            this.closeEditModal();
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du rendez-vous', error);
          }
        );
    }
  }

  deleteAppointment(id: number): void {
    if (confirm('Es-tu sûr de vouloir supprimer ce rendez-vous ?')) {
      this.appointmentService.deleteAppointment(id)
        .subscribe(
          (response) => {
            console.log('Rendez-vous supprimé avec succès:', response);
            this.getAppointments();
          },
          (error) => {
            console.error('Erreur lors de la suppression du rendez-vous', error);
          }
        );
    }
  }

  goToMedicalRecord(userId: number) {
    this.router.navigate(['/doctor/medicalfile', userId]);
  }
  
}
