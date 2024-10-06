import { Component } from '@angular/core';
import { PatientHeaderComponent } from '../../sidebar/patient-header/patient-header.component'; // Assurez-vous que le chemin est correct
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashbaord-patient',
  standalone: true,
  imports: [PatientHeaderComponent], 
  templateUrl: './dashbaord-patient.component.html',
  styleUrl: './dashbaord-patient.component.css'
})
export class DashbaordPatientComponent {
  userInfo: any = {}; // Use object instead of array

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.authService.getUserInfo().subscribe(
      data => {
        if (data && data.data) {
          this.userInfo = data.data;
        }
      },
      error => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur');
      }
    );
  }
}
