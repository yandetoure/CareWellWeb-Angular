import { Component } from '@angular/core';
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-dashbaord-doctor',
  standalone: true,
  imports: [DoctorSidebarComponent], 
  templateUrl: './dashbaord-doctor.component.html',
  styleUrls: ['./dashbaord-doctor.component.css'] 
})
export class DashbaordDoctorComponent {

}
