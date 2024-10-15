import { Component } from '@angular/core';
import { AvailabilityService } from '../../services/availability.service';
import { FormsModule } from '@angular/forms';  // Import nécessaire pour ngModel
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { HttpClientModule } from '@angular/common/http';  // Import pour HttpClient
import Swal from 'sweetalert2';
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, DoctorSidebarComponent],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.css'
  
})
export class AvailabilityComponent {
  availabilities: any[] = [];

  constructor(private availabilityService: AvailabilityService) {}

  ngOnInit(): void {
    this.loadAvailabilities();
  }

  // formatDate(dateString: string): string {
  //   const date = new Date(dateString);
  //   // Format en français: exemple "lundi 19 octobre 2025"
  //   return this.datePipe.transform(date, 'EEEE d MMMM y', 'fr-FR') || '';
  // }

  // Fonction pour formater l'heure sans secondes
  formatTime(timeString: string): string {
    return timeString.slice(0, 5);  // Garde seulement les heures et minutes "HH:MM"
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
  addAvailabilitySelf(availabilityData: any) {
    console.log('Données de disponibilité à ajouter :', availabilityData); // Log des données envoyées

    this.availabilityService.addAvailabilitySelf(availabilityData).subscribe(
      (response) => {
        if (response.status) {
          console.log('Disponibilité ajoutée avec succès :', response.data); // Log de la réponse en cas de succès
          this.loadAvailabilities(); // Recharge les disponibilités après ajout
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