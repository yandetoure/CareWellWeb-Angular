import { Component } from '@angular/core';
import { PatientHeaderComponent } from '../../sidebar/patient-header/patient-header.component'; // Assurez-vous que le chemin est correct


@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [PatientHeaderComponent], 
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.css'
})
export class PatientProfileComponent {

}
