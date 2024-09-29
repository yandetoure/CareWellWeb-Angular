import { Component } from '@angular/core';
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component'; // Assurez-vous que le chemin est correct


@Component({
  selector: 'app-medical-files',
  standalone: true,
  imports: [DoctorSidebarComponent], // Ajoutez ici le composant de la sidebar
  templateUrl: './medical-files.component.html',
  styleUrl: './medical-files.component.css'
})
export class MedicalFilesComponent {

}
