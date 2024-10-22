import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  
import { HttpClientModule } from '@angular/common/http';  
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service'; 
import { ServiceService } from '../../services/service.service';  
import { PatientHeaderComponent } from '../../sidebar/patient-header/patient-header.component'; 

import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, PatientHeaderComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  services: any[] = [];
  newAppointment = {
    user_id: 0,
    service_id: '',
    reason: '',
    symptoms: '',
    date: '',
    time: ''
  };
  availableSlots: string[] = []; 

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService, 
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.getAppointments();
    this.getUserId();
    this.getServices(); 
  }

  // Récupération des rendez-vous
  getAppointments() {
    this.appointmentService.getAppointments().subscribe(
      (response) => {
        this.appointments = response.data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de récupérer les rendez-vous.',
        });
      }
    );
  }

  // Récupération de l'utilisateur actuellement connecté
  getUserId() {
    let user = localStorage.getItem('user');
    if(user) {
      this.newAppointment.user_id = JSON.parse(user)?.id ?? 0;
    }
    console.log(this.newAppointment);
  }

  getServices() {
    this.serviceService.getServices().subscribe(
      (response) => {
        this.services = response.data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de récupérer les services.',
        });
      }
    );
  }

  // Nouvelle méthode pour récupérer les créneaux disponibles
  getAvailableSlots() {
    this.appointmentService.getAvailableSlots(this.newAppointment.service_id, this.newAppointment.date).subscribe(
      (response) => {
        this.availableSlots = response.data; // Mettre à jour les créneaux disponibles
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de récupérer les créneaux disponibles.',
        });
      }
    );
  }

  addAppointment() {
    this.appointmentService.addAppointment(this.newAppointment).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Rendez-vous créé avec succès',
        });
        this.getAppointments();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur lors de la création du rendez-vous.',
        });
      }
    );
  }
}
