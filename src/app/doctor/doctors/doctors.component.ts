import { Component } from '@angular/core';
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component'; // Assurez-vous que le chemin est correct
@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [DoctorSidebarComponent], // Ajoutez ici le composant de la sidebar
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent {

}
