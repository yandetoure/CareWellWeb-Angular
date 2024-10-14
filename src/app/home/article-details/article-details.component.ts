import { Component } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';


@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css'
})
export class ArticleDetailsComponent {
  selectedArticle: any; 
  article: any = null;


  constructor(
    private articlesService: ArticlesService,

  ) {}


  loadArticleDetails(id: string): void {
    this.articlesService.getArticleById(id).subscribe({
      next: (data) => {
        console.log('Données récupérées :', data); 
        this.article = data.data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des détails du dossier médical', error);
      }
    });
  }
}
