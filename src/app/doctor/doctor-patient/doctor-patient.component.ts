import { Component } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-patient',
  standalone: true,
  imports: [CommonModule, DoctorSidebarComponent, HttpClientModule, FormsModule],
  templateUrl: './doctor-patient.component.html',
  styleUrl: './doctor-patient.component.css'
})
export class DoctorPatientComponent {

  patients: any[] = [];
  selectedPatient: any; // Patient sélectionné pour la mise à jour
  isModalOpen: boolean = false; // État du modal
  isDetailsModalOpen: boolean = false;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.loadPatients();
  }

  // Charger la liste des patients depuis l'API
  loadPatients(): void {
    this.appointmentService.getPatientsWithAppointmentsDoctor().subscribe({
      next: (data) => {
        this.patients = data.data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des patients', error);
      }
    });
  }


  openUpdateModal(patient: any) {
    this.selectedPatient = { ...patient };
    this.isModalOpen = true;
  }

  closeUpdateModal() {
    this.isModalOpen = false;
  }

  openDetailsModal(patient: any): void {
    this.selectedPatient = patient;
    this.isDetailsModalOpen = true;
  }

  closeDetailsModal(): void {
    this.isDetailsModalOpen = false; 
  }

  // updatePatientConfirmed(form: any) {
  //   if (form.valid) {
  //     if (confirm("Êtes-vous sûr de vouloir mettre à jour le rendez-vous ?")) {
  //       const patientId = this.selectedPatient.patient_id; 
  //       this.appointmentService.updateAppointment(patientId, this.selectedPatient).subscribe(
  //         () => {
  //           alert("Rendez-vous mis à jour avec succès !");
  //           this.loadPatients();
  //           this.closeUpdateModal();
  //         },
  //         (error) => {
  //           console.error("Error updating appointment:", error);
  //           alert("Une erreur est survenue lors de la mise à jour du rendez-vous.");
  //         }
  //       );
  //     }
  //   } else {
  //     alert("Veuillez remplir tous les champs requis.");
  //   }
  // }
  
  updatePatientConfirmed(form: any) {
    if (form.valid) {
      if (confirm("Êtes-vous sûr de vouloir mettre à jour le rendez-vous ?")) {
        const patientId = this.selectedPatient.patient_id;
  
        const updatedData = {
          is_visited: this.selectedPatient.is_visited,
          appointment_date: this.selectedPatient.appointment_date,
          appointment_time: this.selectedPatient.appointment_time
        };
  
        // Ajoutez ce log pour voir les données
        console.log('Données à envoyer :', updatedData);
  
        this.appointmentService.updateAppointment(patientId, updatedData).subscribe(
          (response: any) => {
            alert("Rendez-vous mis à jour avec succès !");
            this.loadPatients();
            this.closeUpdateModal();
          },
          (error) => {
            console.error("Erreur lors de la mise à jour du rendez-vous :", error);
            alert("Une erreur est survenue lors de la mise à jour du rendez-vous.");
          }
        );
      }
    } else {
      alert("Veuillez remplir tous les champs requis.");
    }
  }  
  
}