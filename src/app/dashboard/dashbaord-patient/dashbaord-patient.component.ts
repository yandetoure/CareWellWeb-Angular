import { Component } from '@angular/core';
import { PatientHeaderComponent } from '../../sidebar/patient-header/patient-header.component'; // Assurez-vous que le chemin est correct


@Component({
  selector: 'app-dashbaord-patient',
  standalone: true,
  imports: [PatientHeaderComponent], 
  templateUrl: './dashbaord-patient.component.html',
  styleUrl: './dashbaord-patient.component.css'
})
export class DashbaordPatientComponent {

}
