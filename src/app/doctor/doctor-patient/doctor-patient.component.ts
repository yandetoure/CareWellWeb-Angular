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
  tickets: any[] = [];

  patients: any[] = [];
  selectedPatient: any; 
  isModalOpen: boolean = false; 
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
  // appointment.component.ts


  updatePatientConfirmed(appointmentId: number, isVisited: boolean) {
    Swal.fire({
      title: 'Confirmer la mise à jour',
      text: `Voulez-vous marquer ce rendez-vous comme ${isVisited ? 'non reçu' : 'reçu'} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, mettre à jour',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentService.updateStatus(appointmentId, { is_visited: isVisited }).subscribe(
          (response) => {
            this.loadPatients(); // Recharger la liste des patients après la mise à jour
            Swal.fire('Succès!', 'Le statut du rendez-vous a été mis à jour.', 'success');
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du statut', error);
            Swal.fire('Erreur!', 'Une erreur s\'est produite lors de la mise à jour du statut.', 'error');
          }
        );
      }
    });
  }
  
  
  
  
}