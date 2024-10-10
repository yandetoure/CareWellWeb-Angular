import { Component } from '@angular/core';
import { PrescriptionService } from '../../services/prescription.service';
import { FormsModule } from '@angular/forms';  // Import nécessaire pour ngModel
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { HttpClientModule } from '@angular/common/http';  // Import pour HttpClient
import { AccountantSidebarComponent } from '../../sidebar/accountant-sidebar/accountant-sidebar.component'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-accountable-prescriptions',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, AccountantSidebarComponent],  
  templateUrl: './accountable-prescriptions.component.html',
  styleUrls: ['./accountable-prescriptions.component.css']
})
export class AccountablePrescriptionsComponent {
  prescriptions: any[] = [];
  services: any[] = [];
  newPrescription = {
    name: '',
    quantity: '',
    price: '',
    service_id: ''
  };
  
  searchTerm: string = ''; // Ajout de la propriété pour le champ de recherche
  
  constructor(private prescriptionService: PrescriptionService) {}

  ngOnInit(): void {
    this.getPrescriptions();
    this.getServices();
  }

  // Récupérer les services
  getServices() {
    this.prescriptionService.getServices().subscribe(response => {
      this.services = response.data; // Remplir la liste des services
    });
  }

  selectedPrescription: any = null;

  // Appelle cette méthode lorsque l'utilisateur clique sur le bouton de modification
  selectPrescription(prescription: any) {
    this.selectedPrescription = { ...prescription }; // Clone l'objet pour éviter les références
  }

  // Récupérer les prescriptions
  getPrescriptions() {
    this.prescriptionService.getPrescriptions().subscribe(response => {
      this.prescriptions = response.data;
    });
  }

  // Ajouter une prescription
  addPrescription() {
    this.prescriptionService.addPrescription(this.newPrescription).subscribe(response => {
      this.getPrescriptions(); // Actualiser la liste après l'ajout
      this.newPrescription = { name: '', quantity: '', price: '', service_id: '' }; // Réinitialiser le formulaire
    });
  }

  // Modifier une prescription
  updatePrescription(id: string, prescription: any) {
    this.prescriptionService.updatePrescription(id, prescription).subscribe(response => {
      this.getPrescriptions(); // Actualiser la liste après la mise à jour
      this.selectedPrescription = null; // Réinitialiser la sélection
    });
  }
  
  // Supprimer une prescription
  deletePrescription(id: string) {
    this.prescriptionService.deletePrescription(id).subscribe(response => {
      this.getPrescriptions(); // Actualiser la liste après la suppression
    });
  }

  // Méthode pour filtrer les prescriptions
  get filteredPrescriptions() {
    if (!this.searchTerm) {
      return this.prescriptions; // Si aucun terme de recherche, retourner toutes les prescriptions
    }
    return this.prescriptions.filter(prescription => 
      prescription.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      prescription.service_id.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
