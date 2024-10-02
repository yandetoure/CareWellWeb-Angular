import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import nécessaire pour ngModel
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { HttpClientModule } from '@angular/common/http';  // Import pour HttpClient
import { AppointmentService } from '../../services/appointment.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  appointments: any[] = [];
  newAppointment = {
    user_id: '',
    service_id: '',
    reason: '',
    symptoms: '',
    date: '',
    time: ''
  };

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    this.appointmentService.getAppointments().subscribe((response) => {
      this.appointments = response.data;
    });
  }

  addAppointment() {
    this.appointmentService.addAppointment(this.newAppointment).subscribe((response) => {
      alert('Rendez-vous créé avec succès');
      this.getAppointments(); // Rafraîchit la liste des rendez-vous
    });
  }
}
