import { Component } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css'
})
export class ArticleDetailsComponent {
  [x: string]: any;
  selectedArticle: any; 
  article: any = null;


  constructor(
    private route: ActivatedRoute,

    private articlesService: ArticlesService,

  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {

    this.loadArticleDetails(id); 
    }
  }
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


