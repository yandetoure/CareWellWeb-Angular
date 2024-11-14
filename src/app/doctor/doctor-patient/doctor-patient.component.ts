import { Component } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-patient',
  standalone: true,
  imports: [CommonModule, DoctorSidebarComponent, HttpClientModule, FormsModule],
  templateUrl: './doctor-patient.component.html',
  styleUrls: ['./doctor-patient.component.css']
})
export class DoctorPatientComponent {
  patients: any[] = [];
  filteredPatients: any[] = []; // Liste filtrée des patients
  filterDate: string = ''; // Date filtrée
  searchQuery: string = ''; // Champ de recherche
  today: Date = new Date(); // Date du jour

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.appointmentService.getPatientsWithAppointmentsDoctor().subscribe({
      next: (data) => {
        this.patients = data.data;
        this.filteredPatients = this.patients; // Initialisation avec la liste complète
      },
      error: (error) => {
        console.error('Erreur lors du chargement des patients', error);
      }
    });
  }

  updateStatus(appointmentId: number, currentStatus: boolean) {
    console.log('ID du rendez-vous :', appointmentId); 
    const newStatus = !currentStatus;
    Swal.fire({
      title: 'Confirmer la mise à jour',
      text: `Voulez-vous marquer ce rendez-vous comme ${newStatus ? 'reçu' : 'non reçu'} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, mettre à jour',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentService.updateAppointmentStatus(appointmentId, { is_visited: newStatus }).subscribe({
          next: () => {
            this.loadPatients(); // Recharge les patients pour actualiser le statut
            Swal.fire('Succès!', 'Le statut a été mis à jour.', 'success');
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour', error);
            Swal.fire('Erreur!', 'Impossible de mettre à jour le statut.', 'error');
          }
        });
      }
    });
  }

  filterAppointments(): void {
    this.filteredPatients = this.patients.filter(patient => {
      // Filtre par date
      const matchDate = this.filterDate ? patient.appointment_date === this.filterDate : true;
      // Filtre par recherche de texte
      const matchSearch = this.searchQuery ? 
        (patient.patient_first_name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        patient.patient_last_name.toLowerCase().includes(this.searchQuery.toLowerCase())) : true;

      return matchDate && matchSearch;
    });
  }
}
