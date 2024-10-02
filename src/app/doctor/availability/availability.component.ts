import { Component } from '@angular/core';
import { AvailabilityService } from '../../services/availability.service';
import { FormsModule } from '@angular/forms';  // Import nécessaire pour ngModel
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { HttpClientModule } from '@angular/common/http';  // Import pour HttpClient
import Swal from 'sweetalert2';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.css'
})
export class AvailabilityComponent {
  availabilities: any[] = [];

  constructor(private availabilityService: AvailabilityService) {}

  ngOnInit(): void {
    this.loadAvailabilities();
  }

  // Charger toutes les disponibilités
  loadAvailabilities() {
    this.availabilityService.getAvailabilities().subscribe(
      (response) => {
        if (response.status) {
          this.availabilities = response.data;
        } else {
          console.error('Erreur lors du chargement des disponibilités');
        }
      },
      (error) => {
        console.error('Erreur API', error);
      }
    );
  }

  // Ajouter une disponibilité (tu peux appeler cette fonction depuis un formulaire)
  addAvailability(availabilityData: any) {
    this.availabilityService.addAvailability(availabilityData).subscribe(
      (response) => {
        if (response.status) {
          this.loadAvailabilities(); // Recharger les disponibilités après l'ajout
        } else {
          console.error('Erreur lors de l\'ajout de disponibilité');
        }
      },
      (error) => {
        console.error('Erreur API', error);
      }
    );
  }
}