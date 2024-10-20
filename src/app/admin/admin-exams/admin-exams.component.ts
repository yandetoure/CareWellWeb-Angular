import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Import nécessaire pour ngModel
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { HttpClientModule } from '@angular/common/http';  // Import pour HttpClient
import Swal from 'sweetalert2';
import { AdminSidebarComponent } from '../../sidebar/admin-sidebar/admin-sidebar.component'; // Assurez-vous que le chemin est correct
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-admin-exams',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, AdminSidebarComponent],
  templateUrl: './admin-exams.component.html',
  styleUrl: './admin-exams.component.css'
})
export class AdminExamsComponent {
  exams: any[] = [];
  newExam: any = {
    name: '',
    price: null, 
    quantity: '', 
    service_id: '',
  };
  searchTerm: string = '';
  selectedExam: any; // Article sélectionné pour la mise à jour
  isModalOpen: boolean = false; // État du modal
  isDetailsModalOpen: boolean = false;
  services: any[] = [];


  constructor(private http: HttpClient,
    private serviceService: ServiceService ,
  ) {}

  ngOnInit(): void {
    this.loadExam();
  }

  loadExam() {
    this.http.get<any>('http://localhost:8000/api/exams').subscribe(response => {
      this.exams = response.data;
    });
  }

  addExam() {
    const formData = new FormData();
    formData.append('title', this.newExam.title);
    formData.append('content', this.newExam.content);  
    formData.append('symptoms', this.newExam.symptoms);
    formData.append('advices', this.newExam.advices);
    formData.append('advices', this.newExam.description);


    this.http.post('http://localhost:8000/api/exams', formData).subscribe(response => {
      this.loadExam(); // Rechargez les articles
      this.newExam = { name: '', description: '', price:'', quantity:'', service_id:'' }; // Réinitialisez le formulaire
    });
  }

  onFileSelected(event: any) {
    this.newExam.photo = event.target.files[0]; // Assigner le fichier sélectionné
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