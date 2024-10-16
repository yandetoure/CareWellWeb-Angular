
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services//appointment.service'; 
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  
import { HttpClientModule } from '@angular/common/http'; 
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-doctor-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, DoctorSidebarComponent],
  templateUrl: './doctor-appointment.component.html',
  styleUrl: './doctor-appointment.component.css'
})
export class DoctorAppointmentComponent {
  appointments: any[] = []; 
  selectedAppointment: any; 
  isModalOpen: boolean = false; // État du modal


  isDetailsModalOpen: boolean = false; 
  isEditModalOpen: boolean = false; 

  constructor(private appointmentService: AppointmentService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.getAppointments(); 
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
      return 'past-appointment'; 
    } else if (appointment.getTime() - today.getTime() < 3 * 24 * 60 * 60 * 1000) {
      return 'near-appointment'; 
    } else {
      return 'upcoming-appointment'; 
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

  goToMedicalRecord(userId: number) {
    this.router.navigate(['/doctor/medicalfile', userId]);
  }

  updatePatientConfirmed(form: any) {
    if (form.valid) {
      if (confirm("Êtes-vous sûr de vouloir mettre à jour le rendez-vous ?")) {
        const patientId = this.selectedAppointment.patient_id;
  
        const updatedData = {
          is_visited: this.selectedAppointment.is_visited,
        };
  
        // Ajoutez ce log pour voir les données
        console.log('Données à envoyer :', updatedData);
  
        this.appointmentService.updateAppointment(patientId, updatedData).subscribe(
          (response: any) => {
            alert("Rendez-vous mis à jour avec succès !");
            this.getAppointments();
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


