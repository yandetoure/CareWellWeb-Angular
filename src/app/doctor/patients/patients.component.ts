import { Component } from '@angular/core';
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [DoctorSidebarComponent], // Ajoutez ici le composant de la sidebar
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {

}
