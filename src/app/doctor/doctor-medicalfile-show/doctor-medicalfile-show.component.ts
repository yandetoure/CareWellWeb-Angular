import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalFileService } from '../../services/medicalfile.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { PrescriptionService } from '../../services/prescription.service';
import { ExamService } from '../../services/exam.service';
import Swal from 'sweetalert2';
import { DiseasesService } from '../../services/diseases.service';


@Component({
  selector: 'app-doctor-medicalfile-show',
  standalone: true,
  imports: [CommonModule, DoctorSidebarComponent, FormsModule],
  templateUrl: './doctor-medicalfile-show.component.html',
  styleUrl: './doctor-medicalfile-show.component.css',
})
export class DoctorMedicalfileShowComponent {
  userInfo: any = {};

  medicalFile: any = null;
  prescriptions: any[] = [];
  exams: any[] = [];
  medicalfilehistory: any[] = [];
  diseases: any[] = [];
  showForms = false;

  constructor(
    private route: ActivatedRoute,
    private medicalFileService: MedicalFileService,
    private authService: AuthService,
    private noteService: NotesService,
    private prescriptionService: PrescriptionService,
    private examService: ExamService,
    private router: Router,
    private diseaseService: DiseasesService,

  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMedicalFileDetails(id);
      this.loadPrescriptions(); 
      this.loadExams(); 
      this.loadDiseases(); 

    }
  }
  toggleForms() {
    this.showForms = !this.showForms;
  }
  toggleForms2() {
    this.showForms = !this.showForms;
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
  // Fonction pour calculer le temps écoulé
  getRelativeTime(date: Date | string): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
    
    let interval = Math.floor(diffInSeconds / 31536000);
    if (interval > 1) return `il y a ${interval} ans`;
    interval = Math.floor(diffInSeconds / 2592000);
    if (interval > 1) return `il y a ${interval} mois`;
    interval = Math.floor(diffInSeconds / 86400);
    if (interval > 1) return `il y a ${interval} jours`;
    interval = Math.floor(diffInSeconds / 3600);
    if (interval > 1) return `il y a ${interval} heures`;
    interval = Math.floor(diffInSeconds / 60);
    if (interval > 1) return `il y a ${interval} minutes`;
    return `il y a quelques secondes`;
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
          console.log('Note ajoutée avec succès:', response);
          Swal.fire('Succès', 'La note a été ajoutée avec succès.', 'success'); 
          this.loadMedicalFileDetails(medicalFileId); 
          this.showForms = false; 
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la note:', error);
          Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout de la note.', 'error'); 
        }
      );
    } else {
      console.error('ID du dossier médical non trouvé');
      Swal.fire('Erreur', 'ID du dossier médical non trouvé.', 'error'); 
    }
  }
  
  addHistory(historyData: any) {
    const medicalFileId = this.medicalFile.id;
    console.log('Données envoyées:', historyData);

    if (medicalFileId) {
      this.medicalFileService.addHistory(medicalFileId, historyData).subscribe(
        (response) => {
          console.log('Antécédent ajouté avec succès:', response);
          Swal.fire('Succès', 'L\'antécédent a été ajouté avec succès.', 'success'); 
          this.loadMedicalFileDetails(medicalFileId); 
          this.showForms = false; 
        },
        (error) => {
          console.error('Erreur lors de la création de l\'antécédent:', error);
          Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout de l\'antécédent.', 'error'); 
        }
      );
    } else {
      console.error('ID du dossier médical non trouvé');
      Swal.fire('Erreur', 'ID du dossier médical non trouvé.', 'error'); 
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

loadExams(): void {
  this.examService.getExams().subscribe({
      next: (data) => {
          console.log('Exams data:', data);
          this.exams = data.data;
      },
      error: (error) => {
          console.error('Erreur lors du chargement des examens', error);
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
        Swal.fire('Succès', 'La prescription a été ajoutée avec succès.', 'success'); 
        this.loadMedicalFileDetails(medicalFileId); 
        this.showForms = false; 
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la prescription:', error);
        Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout de la prescription.', 'error'); 
      }
    );
  } else {
    console.error('ID du dossier médical non trouvé');
    Swal.fire('Erreur', 'ID du dossier médical non trouvé.', 'error'); 
  }
}


addExam(examData: any) {
  const medicalFileId = this.medicalFile.id;
  if (medicalFileId) {
    examData.medical_files_id = medicalFileId;
    this.medicalFileService.addExam(medicalFileId, examData).subscribe(
      (response) => {
        console.log('Examen ajouté avec succès:', response);
        Swal.fire('Succès', 'L\'examen a été ajouté avec succès.', 'success'); 
        this.loadMedicalFileDetails(medicalFileId); 
        this.showForms = false; 
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'examen:', error);
        Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout de l\'examen.', 'error'); 
      }
    );
  } else {
    console.error('ID du dossier médical non trouvé');
    Swal.fire('Erreur', 'ID du dossier médical non trouvé.', 'error'); 
  }
}

loadDiseases(): void {
  this.diseaseService.getDisease().subscribe({
      next: (data) => {
          console.log('Maladies data:', data);
          this.diseases = data.data;
      },
      error: (error) => {
          console.error('Erreur lors du chargement des examens', error);
      }
  });
}

addDisease(diseaseData: any) {
  const medicalFileId = this.medicalFile.id;
  if (medicalFileId) {
    diseaseData.medical_files_id = medicalFileId;
    this.medicalFileService.addDisease(medicalFileId, diseaseData).subscribe(
      (response) => {
        console.log('Maladie ajoutée avec succès:', response);
        Swal.fire('Succès', 'La maladie a été ajoutée avec succès.', 'success');
        this.loadMedicalFileDetails(medicalFileId);
        this.showForms = false; 
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la maladie:', error);
        Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout de la maladie.', 'error'); 
      }
    );
  } else {
    console.error('ID du dossier médical non trouvé');
    Swal.fire('Erreur', 'ID du dossier médical non trouvé.', 'error');
  }
}
}
