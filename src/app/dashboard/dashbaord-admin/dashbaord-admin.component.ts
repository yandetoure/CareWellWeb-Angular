import { Component } from '@angular/core';
import { PatientSidebarComponent } from '../../sidebar/patient-sidebar/patient-sidebar.component'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-dashbaord-admin',
  standalone: true,
  imports: [PatientSidebarComponent],
  templateUrl: './dashbaord-admin.component.html',
  styleUrl: './dashbaord-admin.component.css'
})
export class DashbaordAdminComponent {

}
