import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home-services',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], 
  templateUrl: './home-services.component.html',
  styleUrl: './home-services.component.css'
})
export class HomeServicesComponent {
  services: any[] = []; 
  searchTerm: string = '';


  constructor(
    private serviceService: ServiceService,
    private router: Router,

  ) {}


  ngOnInit(): void {
    this.loadServices();

    
}
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

  searchService() {
    if (this.searchTerm) {
      this.services = this.services.filter(service => 
        service.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.loadServices(); // Rechargez les services si le terme de recherche est vide
    }
  }

limitWords(content: string, limit: number = 3): string {
  let words = content.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...'; 
  }
  return content;
}
}
