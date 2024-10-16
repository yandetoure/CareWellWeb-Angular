import { Component } from '@angular/core';
import { PatientHeaderComponent } from '../../sidebar/patient-header/patient-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticlesService } from '../../services/articles.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-patient-article-details',
  standalone: true,
  imports: [CommonModule, PatientHeaderComponent, FormsModule],
  templateUrl: './patient-article-details.component.html',
  styleUrl: './patient-article-details.component.css'
})
export class PatientArticleDetailsComponent {
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


