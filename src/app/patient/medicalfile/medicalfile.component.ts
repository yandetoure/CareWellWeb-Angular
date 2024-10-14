import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalFileService } from '../../services/medicalfile.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { PrescriptionService } from '../../services/prescription.service';
import { PatientHeaderComponent } from '../../sidebar/patient-header/patient-header.component';


@Component({
  selector: 'app-medicalfile',
  standalone: true,
  imports: [CommonModule, PatientHeaderComponent, FormsModule],
  templateUrl: './medicalfile.component.html',
  styleUrl: './medicalfile.component.css'
})
export class MedicalfileComponent {
  medicalFile: any = {};
  notes: any[] = [];
  prescriptions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private medicalFileService: MedicalFileService,
    private authService: AuthService,
    private noteService: NotesService,
    private prescriptionService: PrescriptionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadUserMedicalFile();
    this.loadPrescriptions(); 
  }

  
//Afficher les details de l'auth
loadrMedicalFile(): void {
    this.medicalFileService.getUserMedicalFile().subscribe({
        next: (data) => {
            console.log('Medical file data:', data);
            this.medicalFile = data.data;
        },
        error: (error) => {
            console.error('Erreur lors du chargement du dossier médical', error);
        }
    });
}

loadUserMedicalFile(): void {
  this.medicalFileService.getUserMedicalFile().subscribe({
      next: (data) => {
          console.log('Medical file data:', data);
          this.medicalFile = data.data;
      },
      error: (error) => {
          console.error('Erreur lors du chargement du dossier médical', error);
      }
  });
}
  
  loadPrescriptions(): void {
    this.prescriptionService.getPrescriptions().subscribe({
        next: (data) => {
            console.log('Prescriptions data:', data);
            this.prescriptions = data.data;
        },
        error: (error) => {
            console.error('Erreur lors du chargement des prescriptions', error);
        }
    });
}

}