import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Import nécessaire pour ngModel
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { HttpClientModule } from '@angular/common/http';  // Import pour HttpClient
import Swal from 'sweetalert2';
import { AdminSidebarComponent } from '../../sidebar/admin-sidebar/admin-sidebar.component'; // Assurez-vous que le chemin est correct



@Component({
  selector: 'app-prescription',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, AdminSidebarComponent],
  templateUrl: './prescription.component.html',
  styleUrl: './prescription.component.css'
})
export class PrescriptionComponent {
  prescriptions: any[] = [];
  newPrescription: any = {
    name: '',
    price: null, 
    quantity: '', 
    service_id: '',
  };
  searchTerm: string = '';
  selectedPrescription: any; // Article sélectionné pour la mise à jour
  isModalOpen: boolean = false; // État du modal
  isDetailsModalOpen: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPrescriptions();
  }

  loadPrescriptions() {
    this.http.get<any>('http://localhost:8000/api/prescriptions').subscribe(response => {
      this.prescriptions = response.data;
    });
  }

  addPrescription() {
    const formData = new FormData();
    formData.append('title', this.newPrescription.title);
    formData.append('photo', this.newPrescription.photo);
    formData.append('content', this.newPrescription.content);  
    formData.append('symptoms', this.newPrescription.symptoms);
    formData.append('advices', this.newPrescription.advices);  // Ajouter les conseils

    this.http.post('http://localhost:8000/api/prescriptions', formData).subscribe(response => {
      this.loadPrescriptions(); // Rechargez les articles
      this.newPrescription = { title: '', photo: null, content: '', symptoms:'', advicess:'' }; // Réinitialisez le formulaire
    });
  }

  onFileSelected(event: any) {
    this.newPrescription.photo = event.target.files[0]; // Assigner le fichier sélectionné
  }

  // deleteArticle(id: number) {
  //   this.http.delete(`http://localhost:8000/api/articles/${id}`).subscribe(response => {
  //     this.loadArticles(); // Rechargez les services
  //   });
  // }

//   openUpdateModal(service: any) {
//     this.selectedArticle = { ...service }; // Cloner le service sélectionné
//     this.isModalOpen = true; // Ouvrir le modal
//   }

//   closeUpdateModal() {
//     this.isModalOpen = false; // Fermer le modal
//   }

//   updateArticleConfirmed() {
//     const formData = new FormData();
//     formData.append('title', this.selectedArticle.title);
//     formData.append('photo', this.selectedArticle.photo);
//     formData.append('content', this.selectedArticle.content);
//     formData.append('symptoms', this.selectedArticle.symptoms);
//     formData.append('advices', this.selectedArticle.advices);  // Ajouter les conseils

//     this.http.put(`http://localhost:8000/api/articles/${this.selectedArticle.id}`, formData).subscribe(response => {
//       this.loadArticles(); // Rechargez les services
//       this.closeUpdateModal(); // Fermer le modal après mise à jour
//     });
//   }

//   searchArticle() {
//     if (this.searchTerm) {
//       this.articles = this.articles.filter(article => 
//         article.title.toLowerCase().includes(this.searchTerm.toLowerCase())
//       );
//     } else {
//       this.loadArticles(); // Rechargez les services si le terme de recherche est vide
//     }
//   }

//   deleteArticle(articleId: number) {
//     Swal.fire({
//       title: 'Êtes-vous sûr ?',
//       text: "Vous ne pourrez pas annuler cette action !",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Oui, supprimer !',
//       cancelButtonText: 'Annuler'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Utilisation correcte de serviceId au lieu de id
//         this.http.delete(`http://localhost:8000/api/articles/${articleId}`).subscribe(response => {
//           Swal.fire(
//             'Supprimé !',
//             'L\'article a bien été supprimé.',
//             'success'
//           );
//           // Rechargez la liste des services après suppression
//           this.loadArticles();
//         });
//       }
//     });
//   }

//   // Méthode pour tronquer le contenu à 50 mots
// limitWords(content: string, limit: number = 20): string {
//   let words = content.split(' ');
//   if (words.length > limit) {
//     return words.slice(0, limit).join(' ') + '...'; // Tronquer et ajouter des points de suspension
//   }
//   return content;
// }


//   // Méthode pour ouvrir le modal de détails
//   openDetailsModal(article: any): void {
//     this.selectedArticle = article;
//     this.isDetailsModalOpen = true;
//   }

//   // Méthode pour fermer le modal de détails
//   closeDetailsModal(): void {
//     this.isDetailsModalOpen = false;
//   }
}