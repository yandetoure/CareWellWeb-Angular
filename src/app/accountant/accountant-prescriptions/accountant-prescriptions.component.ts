import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountantSidebarComponent } from '../../sidebar/accountant-sidebar/accountant-sidebar.component'; 
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-accountant-prescriptions',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, AccountantSidebarComponent],  
  templateUrl: './accountant-prescriptions.component.html',
  styleUrl: './accountant-prescriptions.component.css'
})
export class AccountantPrescriptionsComponent {
  prescriptions: any[] = [];
  services: any[] = [];
  newPrescription: any = { name: '', quantity: '', price: '' };
  selectedPrescription: any;
  isModalOpen: boolean = false;
  isDetailsModalOpen: boolean = false;

  constructor(private http: HttpClient,
    private serviceService: ServiceService,
  ) {}

  ngOnInit(): void {
    this.loadPrescriptions();
    this.getServices(); 
  }

  loadPrescriptions() {
    this.http.get<any>('http://localhost:8000/api/prescriptions').subscribe(response => {
      this.prescriptions = response.data;
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

  addPrescription() {
    this.http.post('http://localhost:8000/api/prescriptions', this.newPrescription).subscribe(response => {
      this.loadPrescriptions();
      this.newPrescription = { name: '', quantity: '', price: '' };  // Réinitialiser le formulaire
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
        this.http.delete(`http://localhost:8000/api/prescriptions/${id}`).subscribe(() => {
          Swal.fire('Supprimé !', 'L\'article a bien été supprimé.', 'success');
          this.loadPrescriptions();
        });
      }
    });
  }

  openUpdateModal(prescription: any) {
    this.selectedPrescription = { ...prescription };
    this.isModalOpen = true;
  }

  updatePrescription() {
    this.http.put(`http://localhost:8000/api/prescriptions/${this.selectedPrescription.id}`, this.selectedPrescription).subscribe(() => {
      this.loadPrescriptions();
      this.isModalOpen = false;
    });
  }

  openDetailsModal(prescription: any) {
    this.selectedPrescription = prescription;
    this.isDetailsModalOpen = true;
  }

  closeDetailsModal() {
    this.isDetailsModalOpen = false;
  }
}
