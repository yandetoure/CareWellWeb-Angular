import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {
  currentSection: string='';

  setActiveSection(section: string) {this.currentSection = section;}
  services: any[] = []; // Gardez le type any[]

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.serviceService.getServices().subscribe(
      (response: any) => {
        this.services = response.data.map((service: any) => { // Utilisez 'any' ici
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
}
