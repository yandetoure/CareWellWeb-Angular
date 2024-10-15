import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ArticlesService } from '../services/articles.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink,]
})
export class HomeComponent implements OnInit {
  currentSection: string = '';
  services: any[] = []; 
  articles: any[] = []; 
  users: any[] = [];


  constructor(
    private serviceService: ServiceService,
    private articlesService: ArticlesService,
    private authService: AuthService,
    private router: Router,
  ) {}
  selectedArticle: any; // Article sélectionné pour la mise à jour

  isModalOpen: boolean = false; // État du modal
  isDetailsModalOpen: boolean = false;

  ngOnInit(): void {
    this.loadServices(); // Appel à la méthode de récupération des services
    this.loadArticles(); // Appel à la méthode de récupération des articles
    this.loadDoctors(); // Appel à la méthode pour charger les utilisateurs avec le rôle Doctor
  }

  setActiveSection(section: string) {
    this.currentSection = section;
  }

  scrollToSection(sectionId: string) {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Méthode dédiée pour récupérer les services depuis l'API
  loadServices(): void {
    this.serviceService.getServices().subscribe(
      (response: any) => {
        this.services = response.data.map((service: any) => {
          if (service.photo) {
            service.photo = `http://localhost:8000/storage/${service.photo}`; 
          }
          return service;
        });
        console.log(this.services);
      },
      (error) => {
        console.error('Erreur lors de la récupération des services', error);
      }
    );
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

  loadDoctors(): void {
    this.authService.getUsers().subscribe(
      (response: any) => {
        this.users = response.data.filter((user: any) => user.role === 'Doctor'); 
        console.log(this.users); 
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

  limitWords(content: string, limit: number = 2): string {
    let words = content.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...'; 
    }
    return content;
  }

  goToArticleDetails(id: string): void {
    this.router.navigate(['/article-details', id]);
  }

openDetailsModal(article: any): void {
  this.selectedArticle = article;
  this.isDetailsModalOpen = true;
  setTimeout(() => {
    const modalElement = document.getElementById('detailsModal');
    if (modalElement) {
      modalElement.classList.add('show');
    }
  }, 0); // Délai pour appliquer les classes Bootstrap
}

// Méthode pour fermer le modal de détails
closeDetailsModal(): void {
  this.isDetailsModalOpen = false;
  const modalElement = document.getElementById('detailsModal');
  if (modalElement) {
    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
  }
}


goToMedicalFileDetails(id: string): void {
  this.router.navigate(['/article-details', id]);
}

}
