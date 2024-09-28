import { Component } from '@angular/core';
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-dashbaord-doctor',
  standalone: true,
  imports: [DoctorSidebarComponent], // Ajoutez ici le composant de la sidebar
  templateUrl: './dashbaord-doctor.component.html',
  styleUrls: ['./dashbaord-doctor.component.css'] // Corrigez ici 'styleUrl' en 'styleUrls'
})
export class DashbaordDoctorComponent {
  // Ajoutez ici la logique spécifique à ce composant si nécessaire
}
