import { Component } from '@angular/core';

@Component({
  selector: 'app-doctor-medicalfile',
  standalone: true,
  imports: [],
  templateUrl: './doctor-medicalfile.component.html',
  styleUrl: './doctor-medicalfile.component.css'
})
export class DoctorMedicalfileComponent {
  medicalFile: any;
  prescriptions: any[] = [];
  examinations: any[] = [];

  newNote: string = '';
  selectedPrescription: number | null = null;
  selectedExamination: number | null = null;

  // constructor(
  //   private route: ActivatedRoute,
  //   private medicalFileService: MedicalFileService,
  //   private prescriptionService: PrescriptionService,
  //   private examinationService: ExaminationService
  // ) {}

  // ngOnInit(): void {
  //   const fileId = this.route.snapshot.paramMap.get('id');
  //   this.getMedicalFile(fileId);
  //   this.getPrescriptions();
  //   this.getExaminations();
  // }

  // getMedicalFile(id: string) {
  //   this.medicalFileService.getMedicalFile(id).subscribe(file => {
  //     this.medicalFile = file;
  //   });
  // }

  // getPrescriptions() {
  //   this.prescriptionService.getAllPrescriptions().subscribe(data => {
  //     this.prescriptions = data;
  //   });
  // }

  // getExaminations() {
  //   this.examinationService.getAllExaminations().subscribe(data => {
  //     this.examinations = data;
  //   });
  // }

  // addNote() {
  //   if (this.newNote) {
  //     this.medicalFileService.addNote(this.medicalFile.id, this.newNote).subscribe(response => {
  //       this.medicalFile.notes.push(response); // Ajoute la note à la liste
  //       this.newNote = ''; // Réinitialise le champ de saisie
  //     });
  //   }
  // }

  // addPrescription() {
  //   if (this.selectedPrescription) {
  //     this.medicalFileService.addPrescription(this.medicalFile.id, this.selectedPrescription).subscribe(response => {
  //       // Gérer la réponse ou rafraîchir les données si nécessaire
  //     });
  //   }
  // }

  // addExamination() {
  //   if (this.selectedExamination) {
  //     this.medicalFileService.addExamination(this.medicalFile.id, this.selectedExamination).subscribe(response => {
  //       // Gérer la réponse ou rafraîchir les données si nécessaire
  //     });
  //   }
  // }
}