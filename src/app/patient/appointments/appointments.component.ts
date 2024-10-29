import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  
import { HttpClientModule } from '@angular/common/http';  
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service'; 
import { ServiceService } from '../../services/service.service';  
import { PatientHeaderComponent } from '../../sidebar/patient-header/patient-header.component'; 
import { DatePipe } from '@angular/common';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, PatientHeaderComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css',
  providers: [DatePipe] 
})
export class AppointmentsComponent implements OnInit {
  minDate: string = '';
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
    private serviceService: ServiceService,
    private datePipe: DatePipe 
  ) {}

  ngOnInit(): void {
    // this.getAppointments();
    this.setMinDate();
    this.getUserId();
    this.getServices(); 
  }
  setMinDate(): void {
    const today = new Date();
    this.minDate = this.datePipe.transform(today, 'yyyy-MM-dd')!;
  }
  // Récupération des rendez-vous
  // getAppointments() {
  //   this.appointmentService.getAppointments().subscribe(
  //     (response) => {
  //       this.appointments = response.data;
  //     },
  //     (error) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Erreur',
  //         text: 'Impossible de récupérer les rendez-vous.',
  //       });
  //     }
  //   );
  // }

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
        // Vous pouvez mettre à jour la liste des rendez-vous si nécessaire
        // this.getAppointments();
      },
      (error) => {
        if (error.status === 422 && error.error.message.includes('48 dernières heures')) {
          Swal.fire({
            icon: 'warning',
            title: 'Attention',
            text: 'Vous avez déjà un rendez-vous dans ce service dans les 48 dernières heures, vous devez attendre au moins 48 heures avant de reprendre rendez-vous.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur lors de la création du rendez-vous.',
          });
        }
      }
    );
  }
  
}
