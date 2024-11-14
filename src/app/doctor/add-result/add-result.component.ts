import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ExamService } from '../../services/exam.service';
import { ResultService } from '../../services/result.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-result',
  standalone: true,
  imports: [CommonModule, DoctorSidebarComponent, HttpClientModule, FormsModule],
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.css'],
})
export class AddResultComponent {
  examPrescription: any;
  result: any = {
    name: '',
    description: '',
  };
  selectedImage: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    private resultService: ResultService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getExamPrescription(id);
    }
  }

  getExamPrescription(id: string): void {
    this.examService.getExamById(id).subscribe({
      next: (data) => {
        console.log('Données récupérées :', data);
        this.examPrescription = data.data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des détails du dossier médical', error);
      },
    });
  }

  addResult(): void {
    if (!this.examPrescription?.id) {
      Swal.fire('Erreur', 'ID de l\'examen introuvable.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.result.name);
    formData.append('description', this.result.description);

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.resultService.addResultToExam(this.examPrescription.id, formData).subscribe({
      next: () => {
        Swal.fire('Succès!', 'Le résultat a été ajouté avec succès.', 'success');
        this.result = { name: '', description: '' };
        this.selectedImage = null;
        this.getExamPrescription(this.examPrescription.id); // Recharger les données de l'examen
      },
      error: (error: HttpErrorResponse) => {
        Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout du résultat.', 'error');
        console.error(error);
      },
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }
}
