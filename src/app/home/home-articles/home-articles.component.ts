import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-articles',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], 
  templateUrl: './home-articles.component.html',
  styleUrl: './home-articles.component.css'
})
export class HomeArticlesComponent {

  articles: any[] = []; 
  searchTerm: string = '';


  constructor(
    private articlesService: ArticlesService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.loadArticles();

    
}

loadArticles(): void {
  this.articlesService.getArticles().subscribe(
    (response: any) => {
      this.articles = response.data.map((article: any) => {
        if (article.photo) {
          article.photo = `http://localhost:8000/storage/${article.photo}`; 
        }
        return article;
      });
      console.log(this.articles);
    },
    (error) => {
      console.error('Erreur lors de la récupération des articles', error);
    }
  );
}

limitWords(content: string, limit: number = 6): string {
  let words = content.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...'; 
  }
  return content;
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

goToArticleDetails(id: string): void {
  this.router.navigate(['/patient/article-details', id]);
}
}
