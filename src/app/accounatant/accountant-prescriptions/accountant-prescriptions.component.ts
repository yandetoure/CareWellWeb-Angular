import { Component } from '@angular/core';
import { PrescriptionService } from '../../services/prescription.service';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';  
import { AccountantSidebarComponent } from '../../sidebar/accountant-sidebar/accountant-sidebar.component'; 

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
  newPrescription = {
    name: '',
    quantity: '',
    price: '',
    service_id: ''
  };
  
  searchTerm: string = '';
  
  constructor(private prescriptionService: PrescriptionService) {}

  ngOnInit(): void {
    this.getPrescriptions();
    this.getServices();
  }

  getServices() {
    this.prescriptionService.getServices().subscribe(response => {
      this.services = response.data; 
    });
  }

  selectedPrescription: any = null;

  selectPrescription(prescription: any) {
    this.selectedPrescription = { ...prescription }; 
  }

  getPrescriptions() {
    this.prescriptionService.getPrescriptions().subscribe(response => {
      this.prescriptions = response.data;
    });
  }

  addPrescription() {
    this.prescriptionService.addPrescription(this.newPrescription).subscribe(response => {
      this.getPrescriptions();
      this.newPrescription = { name: '', quantity: '', price: '', service_id: '' }; 
    });
  }

  updatePrescription(id: string, prescription: any) {
    this.prescriptionService.updatePrescription(id, prescription).subscribe(response => {
      this.getPrescriptions();
      this.selectedPrescription = null;
    });
  }
  
  deletePrescription(id: string) {
    this.prescriptionService.deletePrescription(id).subscribe(response => {
      this.getPrescriptions(); 
    });
  }

  get filteredPrescriptions() {
    if (!this.searchTerm) {
      return this.prescriptions;
    }
    return this.prescriptions.filter(prescription => 
      prescription.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      prescription.service_id.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
