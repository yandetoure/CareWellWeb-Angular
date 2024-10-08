import { Component } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component';

@Component({
  selector: 'app-doctor-patient',
  standalone: true,
  imports: [CommonModule, DoctorSidebarComponent],
  templateUrl: './doctor-patient.component.html',
  styleUrl: './doctor-patient.component.css'
})
export class DoctorPatientComponent {

  patients: any[] = [];  // Tableau pour stocker les patients

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.loadPatients();
  }

  // Charger la liste des patients depuis l'API
  loadPatients(): void {
    this.appointmentService.getPatientsWithAppointments().subscribe({
      next: (data) => {
        this.patients = data.data;  // Assure-toi que 'data.data' correspond à la structure de ton API
      },
      error: (error) => {
        console.error('Erreur lors du chargement des patients', error);
      }
    });
  }
}