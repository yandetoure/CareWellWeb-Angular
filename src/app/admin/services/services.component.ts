import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Import nécessaire pour ngModel
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { HttpClientModule } from '@angular/common/http';  // Import pour HttpClient
import Swal from 'sweetalert2';
import { AdminSidebarComponent } from '../../sidebar/admin-sidebar/admin-sidebar.component'; // Assurez-vous que le chemin est correct

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
  selectedService: any; // Service sélectionné pour la mise à jour
  isModalOpen: boolean = false; // État du modal
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
    formData.append('description', this.newService.description);  // Ajouter la description

    this.http.post('http://localhost:8000/api/services', formData).subscribe(response => {
      this.loadServices(); // Rechargez les services
      this.newService = { name: '', photo: null, description: '' }; // Réinitialisez le formulaire
    });
  }

  onFileSelected(event: any) {
    this.newService.photo = event.target.files[0]; // Assigner le fichier sélectionné
  }

  // deleteService(id: number) {
  //   this.http.delete(`http://localhost:8000/api/services/${id}`).subscribe(response => {
  //     this.loadServices(); // Rechargez les services
  //   });
  // }

  openUpdateModal(service: any) {
    this.selectedService = { ...service }; // Cloner le service sélectionné
    this.isModalOpen = true; // Ouvrir le modal
  }

  closeUpdateModal() {
    this.isModalOpen = false; // Fermer le modal
  }

  updateServiceConfirmed() {
    const formData = new FormData();
    formData.append('name', this.selectedService.name);
    formData.append('photo', this.selectedService.photo);
    formData.append('description', this.selectedService.description);

    this.http.put(`http://localhost:8000/api/services/${this.selectedService.id}`, formData).subscribe(response => {
      this.loadServices(); // Rechargez les services
      this.closeUpdateModal(); // Fermer le modal après mise à jour
    });
  }

  searchService() {
    if (this.searchTerm) {
      this.services = this.services.filter(service => 
        service.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.loadServices(); // Rechargez les services si le terme de recherche est vide
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
        // Utilisation correcte de serviceId au lieu de id
        this.http.delete(`http://localhost:8000/api/services/${serviceId}`).subscribe(response => {
          Swal.fire(
            'Supprimé !',
            'Le service a bien été supprimé.',
            'success'
          );
          // Rechargez la liste des services après suppression
          this.loadServices();
        });
      }
    });
  }
  

  // Méthode pour tronquer le contenu à 50 mots
limitWords(content: string, limit: number = 50): string {
  let words = content.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...'; // Tronquer et ajouter des points de suspension
  }
  return content;
}


  // Méthode pour ouvrir le modal de détails
  openDetailsModal(article: any): void {
    this.selectedService = article;
    this.isDetailsModalOpen = true;
  }

  // Méthode pour fermer le modal de détails
  closeDetailsModal(): void {
    this.isDetailsModalOpen = false;
  }

}
