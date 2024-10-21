import { Component } from '@angular/core';
import { AvailabilityService } from '../../services/availability.service';
import { FormGroup, FormsModule, FormBuilder, Validators } from '@angular/forms';  
import { CommonModule } from '@angular/common';  
import { HttpClientModule } from '@angular/common/http';  
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms'; 
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, DoctorSidebarComponent,ReactiveFormsModule,],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.css'
})
export class AvailabilityComponent {
  availabilities: any[] = []; 
  availabilityForm!: FormGroup; 

  constructor(
    private availabilityService: AvailabilityService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadAvailabilities(); 
    this.initForm(); 
    this.availabilityForm.valueChanges.subscribe(() => {
      this.validateEndTime();
    });
  }

  initForm(): void {
    this.availabilityForm = this.fb.group({
      available_date: ['', Validators.required], 
      day_of_week: ['', Validators.required], 
      start_time: ['', Validators.required], 
      end_time: ['', Validators.required], 
      appointment_duration: ['', [Validators.required, Validators.min(5)]], 
      recurrence_type: ['none', Validators.required], 
    });
  }
  endTimeValidator(group: FormGroup) {
    const startTime = group.get('start_time')?.value;
    const endTime = group.get('end_time')?.value;
  
    return (startTime && endTime && startTime >= endTime) ? { endTimeInvalid: true } : null;
  }
  
  formatTime(timeString: string): string {
    return timeString.slice(0, 5);
  }

  // Charger toutes les disponibilités existantes
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

  addAvailabilitySelf() {
    console.log('État du formulaire avant soumission:', this.availabilityForm);
    console.log('Valeurs du formulaire:', this.availabilityForm.value);
    if (!this.availabilityForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs obligatoires.'
      });
      return;
    }

    const availabilityData = this.availabilityForm.value; // Utiliser directement le formulaire

    // Log des données pour débogage
    console.log('Données de disponibilité à ajouter :', availabilityData);

    this.availabilityService.addAvailabilitySelf(availabilityData).subscribe(
      (response) => {
        if (response.status) {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Disponibilité ajoutée avec succès.'
          });
          this.loadAvailabilities();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur lors de l\'ajout de la disponibilité.'
          });
        }
      },
      (error) => {
        console.error('Erreur API', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de la soumission des données.'
        });
      }
    );
}


  validateEndTime() {
    const { start_time, end_time } = this.availabilityForm.value;
  
    if (start_time && end_time) {
      this.availabilityForm.setErrors(null); // Réinitialise les erreurs
      const startTime = new Date(`1970-01-01T${start_time}:00`);
      const endTime = new Date(`1970-01-01T${end_time}:00`);
  
      if (endTime <= startTime) {
        this.availabilityForm.setErrors({ endTimeInvalid: true });
      }
    }
}
}