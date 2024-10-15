import { Component } from '@angular/core';
import { PatientHeaderComponent } from '../../sidebar/patient-header/patient-header.component'; // Assurez-vous que le chemin est correct
import { ArticlesService } from '../../services/articles.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-patient-articles',
  standalone: true,
  imports: [PatientHeaderComponent,CommonModule, RouterLink, FormsModule], 
  templateUrl: './patient-articles.component.html',
  styleUrl: './patient-articles.component.css'
})
export class PatientArticlesComponent {
  articles: any[] = []; 
  searchTerm: string = '';


  constructor(
    private articlesService: ArticlesService,

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
}
