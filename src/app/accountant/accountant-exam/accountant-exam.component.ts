import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountantSidebarComponent } from '../../sidebar/accountant-sidebar/accountant-sidebar.component';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-accountant-exam',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, AccountantSidebarComponent],
  templateUrl: './accountant-exam.component.html',
  styleUrl: './accountant-exam.component.css'
})
export class AccountantExamComponent {
  exams: any[] = [];
  services: any[] = [];
  newExam: any = { name: '', quantity: '', price: '' };
  selectedExam: any;
  isModalOpen: boolean = false;
  isDetailsModalOpen: boolean = false;

  constructor(private http: HttpClient,
              private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadExams();
    this.getServices(); 
  }

  loadExams() {
    this.http.get<any>('http://localhost:8000/api/exams').subscribe(response => {
      this.exams = response.data;
    });
  }

  getServices() {
    this.serviceService.getServices().subscribe(
      (response) => {
        this.services = response.data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de récupérer les services.',
        });
      }
    );
  }

  addExam() {
    this.http.post('http://localhost:8000/api/exams', this.newExam).subscribe(response => {
      this.loadExams();
      this.newExam = { name: '', description: '', price: '' };
      Swal.fire({
        icon: 'success',
        title: 'Ajouté !',
        text: 'L\examen a été ajouté avec succès.',
      });
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur s\'est produite lors de l\'ajout de l\'examen.',
      });
    });
  }

  deleteArticle(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous ne pourrez pas annuler cette action !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:8000/api/exams/${id}`).subscribe(() => {
          Swal.fire('Supprimé !', 'La prescription a bien été supprimée.', 'success');
          this.loadExams();
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors de la suppression.',
          });
        });
      }
    });
  }

  openUpdateModal(exam: any) {
    this.selectedExam = { ...exam };
    this.isModalOpen = true;
  }

  updatePrescription() {
    this.http.put(`http://localhost:8000/api/exams/${this.selectedExam.id}`, this.selectedExam).subscribe(() => {
      this.loadExams();
      this.isModalOpen = false;
      Swal.fire({
        icon: 'success',
        title: 'Mise à jour réussie !',
        text: 'La prescription a été mise à jour avec succès.',
      });
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur s\'est produite lors de la mise à jour.',
      });
    });
  }

  openDetailsModal(exam: any) {
    this.selectedExam = exam;
    this.isDetailsModalOpen = true;
    Swal.fire({
      title: 'Détails de la prescription',
      html: `<p><strong>Nom :</strong> ${exam.name}</p>
             <p><strong>Quantité :</strong> ${exam.description}</p>
             <p><strong>Prix :</strong> ${exam.price} FCFA</p>`,
      icon: 'info',
      confirmButtonText: 'Fermer'
    });
  }

  closeDetailsModal() {
    this.isDetailsModalOpen = false;
  }
}
