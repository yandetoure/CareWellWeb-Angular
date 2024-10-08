import { Component } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../../sidebar/admin-sidebar/admin-sidebar.component'; // Assurez-vous que le chemin est correct


@Component({
  selector: 'app-admin-rendez-vous',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './admin-rendez-vous.component.html',
  styleUrl: './admin-rendez-vous.component.css'
})
export class AdminRendezVousComponent {
  patients: any[] = []; 

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.appointmentService.getPatientsWithAppointments().subscribe({
      next: (data) => {
        this.patients = data.data; 
      },
      error: (error) => {
        console.error('Erreur lors du chargement des patients', error);
      }
    });
  }
}