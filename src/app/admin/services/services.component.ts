import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AdminSidebarComponent } from '../../sidebar/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, AdminSidebarComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  services: any[] = [];
  newService: any = {
    name: '',
    photo: null, 
    description: '', 
  };
  searchTerm: string = '';
  selectedService: any;
  isModalOpen: boolean = false;
  isDetailsModalOpen: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.http.get<any>('http://localhost:8000/api/services').subscribe(response => {
      this.services = response.data;
    });
  }

  addService() {
    const formData = new FormData();
    formData.append('name', this.newService.name);
    formData.append('photo', this.newService.photo);
    formData.append('description', this.newService.description); 

    this.http.post('http://localhost:8000/api/services', formData).subscribe(response => {
      this.loadServices(); 
      this.newService = { name: '', photo: null, description: '' };
    });
  }

  onFileSelected(event: any) {
    this.newService.photo = event.target.files[0];
  }


  openUpdateModal(service: any) {
    this.selectedService = { ...service }; 
    this.isModalOpen = true; 
  }

  closeUpdateModal() {
    this.isModalOpen = false; 
  }

  updateServiceConfirmed() {
    const formData = new FormData();
    formData.append('name', this.selectedService.name);
    formData.append('photo', this.selectedService.photo);
    formData.append('description', this.selectedService.description);

    console.log(formData)

    this.http.put(`http://localhost:8000/api/services/${this.selectedService.id}`, formData).subscribe(response => {
      this.loadServices(); 
      this.closeUpdateModal();
    });
  }

  searchService() {
    if (this.searchTerm) {
      this.services = this.services.filter(service => 
        service.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.loadServices();
    }
  }

  deleteService(serviceId: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous ne pourrez pas annuler cette action !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:8000/api/services/${serviceId}`).subscribe(response => {
          Swal.fire(
            'Supprimé !',
            'Le service a bien été supprimé.',
            'success'
          );
          this.loadServices();
        });
      }
    });
  }
  

limitWords(content: string, limit: number = 50): string {
  let words = content.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...'; 
  }
  return content;
}


  openDetailsModal(article: any): void {
    this.selectedService = article;
    this.isDetailsModalOpen = true;
  }

  closeDetailsModal(): void {
    this.isDetailsModalOpen = false;
  }

}
