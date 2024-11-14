import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ExamService } from '../../services/exam.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-exams',
  standalone: true,
  imports: [CommonModule, DoctorSidebarComponent, HttpClientModule, FormsModule],
  templateUrl: './doctor-exams.component.html',
  styleUrl: './doctor-exams.component.css'
})
export class DoctorExamsComponent {

  exams: any[] = [];
  loading: boolean = false;
  error: string = '';
  

  constructor(private examService: ExamService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.examService.getExamsByService().subscribe({
      next: (response) => {
        this.exams = response.data.map((exam: any) => {
          if (exam.medical_file?.user?.day_of_birth) {
            exam.medical_file.user.age = this.calculateAge(
              exam.medical_file.user.day_of_birth
            );
          }
          return exam;
        });
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors de la récupération des prescriptions';
        console.error(error);
        this.loading = false;
      },
    });
  }

  // Méthode pour calculer l'âge à partir de la date de naissance
  calculateAge(dayOfBirth: string): number {
    const birthDate = new Date(dayOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Ajuster l'âge si l'anniversaire n'a pas encore eu lieu cette année
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }


  markAsDone(exam: any) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous marquer cet examen comme effectué ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, effectuer !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.examService.updateExamStatus(exam.id, true).subscribe({
          next: (response) => {
            // Mettre à jour l'objet prescription pour changer son statut
            exam.is_done = true;
            Swal.fire(
              'Effectué !',
              'La prescription a été marquée comme effectuée.',
              'success'
            );
          },
          error: (error) => {
            console.error(error);
            Swal.fire(
              'Erreur',
              'Une erreur s\'est produite lors de la mise à jour du statut.',
              'error'
            );
          }
        });
      }
    });
  }
  
  viewResult(examId: number): void {
    this.router.navigate(['doctor/add-result', examId]);
  }
}