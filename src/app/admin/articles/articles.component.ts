import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http'; 
import Swal from 'sweetalert2';
import { AdminSidebarComponent } from '../../sidebar/admin-sidebar/admin-sidebar.component'; 


@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, AdminSidebarComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {
  articles: any[] = [];
  newArticle: any = {
    title: '',
    photo: null, 
    content: '', 
    symptoms: '',
    advices: '',
  };
  searchTerm: string = '';
  selectedArticle: any; 
  isModalOpen: boolean = false;
  isDetailsModalOpen: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.http.get<any>('http://localhost:8000/api/articles').subscribe(response => {
      this.articles = response.data;
    });
  }

  addArticle() {
    const formData = new FormData();
    formData.append('title', this.newArticle.title);
    formData.append('photo', this.newArticle.photo);
    formData.append('content', this.newArticle.content);  
    formData.append('symptoms', this.newArticle.symptoms);
    formData.append('advices', this.newArticle.advices);  // Ajouter les conseils

    this.http.post('http://localhost:8000/api/articles', formData).subscribe(response => {
      this.loadArticles(); // Rechargez les articles
      this.newArticle = { title: '', photo: null, content: '', symptoms:'', advicess:'' }; // Réinitialisez le formulaire
    });
  }

  onFileSelected(event: any) {
    this.newArticle.photo = event.target.files[0]; // Assigner le fichier sélectionné
  }

  openUpdateModal(service: any) {
    this.selectedArticle = { ...service }; // Cloner le service sélectionné
    this.isModalOpen = true; // Ouvrir le modal
  }

  closeUpdateModal() {
    this.isModalOpen = false;
  }

  updateArticleConfirmed() {
    const formData = new FormData();
    formData.append('title', this.selectedArticle.title);
    formData.append('photo', this.selectedArticle.photo);
    formData.append('content', this.selectedArticle.content);
    formData.append('symptoms', this.selectedArticle.symptoms);
    formData.append('advices', this.selectedArticle.advices);

    this.http.put(`http://localhost:8000/api/articles/${this.selectedArticle.id}`, formData).subscribe(response => {
      this.loadArticles();
      this.closeUpdateModal(); 
    });
  }

  searchArticle() {
    if (this.searchTerm) {
      this.articles = this.articles.filter(article => 
        article.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.loadArticles(); // Rechargez les services si le terme de recherche est vide
    }
  }

  deleteArticle(articleId: number) {
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
        this.http.delete(`http://localhost:8000/api/delete/${articleId}`).subscribe(response => {
          Swal.fire(
            'Supprimé !',
            'L\'article a bien été supprimé.',
            'success'
          );
          // Rechargez la liste des services après suppression
          this.loadArticles();
        });
      }
    });
  }

  // Méthode pour tronquer le contenu à 50 mots
limitWords(content: string, limit: number = 20): string {
  let words = content.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...'; // Tronquer et ajouter des points de suspension
  }
  return content;
}


  // Méthode pour ouvrir le modal de détails
  openDetailsModal(article: any): void {
    this.selectedArticle = article;
    this.isDetailsModalOpen = true;
  }

  // Méthode pour fermer le modal de détails
  closeDetailsModal(): void {
    this.isDetailsModalOpen = false;
  }
}