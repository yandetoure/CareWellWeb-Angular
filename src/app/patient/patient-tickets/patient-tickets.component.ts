import { Component } from '@angular/core';
import { PatientHeaderComponent } from '../../sidebar/patient-header/patient-header.component';

@Component({
  selector: 'app-patient-tickets',
  standalone: true,
  imports: [PatientHeaderComponent], 
  templateUrl: './patient-tickets.component.html',
  styleUrl: './patient-tickets.component.css'
})
export class PatientTicketsComponent {

}
