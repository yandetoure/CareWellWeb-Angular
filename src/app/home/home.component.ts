import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ArticlesService } from '../services/articles.service';
import { AuthService } from '../services/auth.service'; // Assurez-vous d'importer le service AuthService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {
  currentSection: string = '';
  services: any[] = []; // Gardez le type any[]
  articles: any[] = []; // Gardez le type any[]
  users: any[] = []; // Liste des utilisateurs avec le rôle Doctor

  // Injection de ServiceService, ArticlesService, et AuthService dans le constructeur
  constructor(
    private serviceService: ServiceService,
    private articlesService: ArticlesService,
    private authService: AuthService // Ajout de l'injection du service AuthService
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
            service.photo = `http://localhost:8000/storage/${service.photo}`; // Construire l'URL complète
          }
          return service;
        });
        console.log(this.services); // Vérifiez les données dans la console
      },
      (error) => {
        console.error('Erreur lors de la récupération des services', error);
      }
    );
  }

  // Méthode dédiée pour récupérer les articles depuis l'API
  loadArticles(): void {
    this.articlesService.getArticles().subscribe(
      (response: any) => {
        this.articles = response.data.map((article: any) => {
          if (article.photo) {
            article.photo = `http://localhost:8000/storage/${article.photo}`; // Construire l'URL complète
          }
          return article;
        });
        console.log(this.articles); // Vérifiez les données dans la console
      },
      (error) => {
        console.error('Erreur lors de la récupération des articles', error);
      }
    );
  }

  // Méthode dédiée pour récupérer les utilisateurs avec le rôle "Doctor"
  loadDoctors(): void {
    this.authService.getUsers().subscribe( // Utilisation de AuthService pour obtenir les utilisateurs
      (response: any) => {
        this.users = response.data.filter((user: any) => user.role === 'Doctor'); // Filtrer les utilisateurs avec le rôle "Doctor"
        console.log(this.users); // Vérifiez les utilisateurs avec le rôle Doctor dans la console
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

  limitWords(content: string, limit: number = 2): string {
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

}
