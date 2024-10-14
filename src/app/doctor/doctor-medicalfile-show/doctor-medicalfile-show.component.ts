import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalFileService } from '../../services/medicalfile.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { PrescriptionService } from '../../services/prescription.service';

@Component({
  selector: 'app-doctor-medicalfile-show',
  standalone: true,
  imports: [CommonModule, DoctorSidebarComponent, FormsModule],
  templateUrl: './doctor-medicalfile-show.component.html',
  styleUrl: './doctor-medicalfile-show.component.css'
})
export class DoctorMedicalfileShowComponent {

  medicalFile: any = null;
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMedicalFileDetails(id);
      this.loadPrescriptions(); 
    }
  }

  loadMedicalFileDetails(id: string): void {
    this.medicalFileService.getMedicalFileById(id).subscribe({
      next: (data) => {
        console.log('Données récupérées :', data); 
        this.medicalFile = data.data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des détails du dossier médical', error);
      }
    });
  }
  addNote(noteData: any) {
    const medicalFileId = this.medicalFile.id;
    if (medicalFileId) {
      this.medicalFileService.addNote(medicalFileId, noteData).subscribe(
        (response) => {
          console.log('Note added successfully:', response);
        },
        (error) => {
          console.error('Error adding note:', error);
        }
      );
    } else {
      console.error('Medical file ID not found');
    }
  }
  
  addHistory(historyData: any) {
    const medicalFileId = this.medicalFile.id;
    
    console.log('Données envoyées:', historyData);
  
    if (medicalFileId) {
      this.medicalFileService.addHistory(medicalFileId, historyData).subscribe(
        (response) => {
          console.log('Antécédent ajouté avec succès:', response);
        },
        (error) => {
          console.error('Erreur lors de la création de l\'antécédent:', error);
        }
      );
    } else {
      console.error('Medical file ID not found');
    }
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


  addPrescription(prescriptionData: any) {
    const medicalFileId = this.medicalFile.id;

    if (medicalFileId) {
        prescriptionData.medical_files_id = medicalFileId; 
        this.medicalFileService.addPrescription(medicalFileId, prescriptionData).subscribe(
            (response) => {
                console.log('Prescription ajoutée avec succès:', response);
                this.loadPrescriptions();
            },
            (error) => {
                console.error('Erreur lors de l\'ajout de la prescription:', error);
            }
        );
    } else {
        console.error('ID du dossier médical non trouvé');
    }
}


}
