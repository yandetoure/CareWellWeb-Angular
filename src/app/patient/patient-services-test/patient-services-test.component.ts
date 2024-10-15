import { Component } from '@angular/core';
import { PatientHeaderComponent } from '../../sidebar/patient-header/patient-header.component';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-services-test',
  standalone: true,
  imports: [PatientHeaderComponent,CommonModule, RouterLink, FormsModule], 
  templateUrl: './patient-services-test.component.html',
  styleUrl: './patient-services-test.component.css'
})
export class PatientServicesTestComponent {
  services: any[] = []; 
  searchTerm: string = '';


  constructor(
    private serviceService: ServiceService,
  ) {}

  ngOnInit(): void {
    this.loadServices(); // Appel à la méthode de récupération des services
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

  limitWords(content: string, limit: number = 10): string {
    let words = content.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...'; 
    }
    return content;
  }

  searchService() {
    if (this.searchTerm) {
      this.services = this.services.filter(service => 
        service.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.loadServices();
    }
  }


}
