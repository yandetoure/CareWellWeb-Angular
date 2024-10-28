import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AvailabilityService } from '../../services/availability.service';
import { FormGroup, FormsModule, FormBuilder, Validators } from '@angular/forms';  
import { CommonModule } from '@angular/common';  
import { HttpClientModule } from '@angular/common/http';  
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms'; 
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Calendar, CalendarOptions } from '@fullcalendar/core'
import { DatePipe } from '@angular/common';
import {  signal, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
// import listPlugin from '@fullcalendar/list';
// import { INITIAL_EVENTS, createEventId } from './event-utils';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, DoctorSidebarComponent, ReactiveFormsModule, FullCalendarModule, FullCalendarModule],
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,
  providers: [DatePipe] 
})
export class AvailabilityComponent {
  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };
  minDate: string = '';
  availabilities: any[] = []; 
  availabilityForm!: FormGroup; 
  calendarPlugins = [dayGridPlugin, timeGridPlugin]; 
  defaultView = 'timeGridWeek';
  headerToolbar = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay' // Assure-toi que les types de vue sont bien définis ici
  };
  events: any[] = []; 
  calendar: any;
  constructor(
    private availabilityService: AvailabilityService,
    private fb: FormBuilder,
    private datePipe: DatePipe 
  ) {}


  ngOnInit(): void {
    this.loadAvailabilities(); 
    this.setMinDate();
    this.initForm(); 
    this.availabilityForm.valueChanges.subscribe(() => {
      this.validateEndTime();
    });
    
  }
  setMinDate(): void {
    const today = new Date();
    this.minDate = this.datePipe.transform(today, 'yyyy-MM-dd')!;
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

    // Nouvelle méthode pour gérer le clic sur l'événement
    handleEventClick(info: any) {
      // Logique pour gérer le clic sur un événement
      console.log('Événement cliqué:', info);
      // Tu peux également afficher des détails supplémentaires ou effectuer d'autres actions
    }

  endTimeValidator(group: FormGroup) {
    const startTime = group.get('start_time')?.value;
    const endTime = group.get('end_time')?.value;
  
    return (startTime && endTime && startTime >= endTime) ? { endTimeInvalid: true } : null;
  }
  
  formatTime(timeString: string): string {
    return timeString.slice(0, 5);
  }

  // loadAvailabilities() {
  //   this.availabilityService.getAvailabilities().subscribe(
  //     (response) => {
  //       if (response.status) {
  //         this.events = response.data.map((availability: any) => ({
  //           title: `${availability.doctor?.first_name} ${availability.doctor?.last_name}`,
  //           start: availability.available_date + 'T' + availability.start_time,
  //           end: availability.available_date + 'T' + availability.end_time
  //         }));
  //       }
  //     },
  //     (error) => {
  //       console.error('Erreur API', error);
  //     }
  //   );
  // }

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
  
  getDayName(dayIndex: number): string {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return days[dayIndex];
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

    const availabilityData = this.availabilityForm.value;

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
          this.availabilityForm.reset(); 
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: response.message || 'Une erreur s\'est produite.'
          });
        }
      },
      (error) => {
        console.error('Erreur API', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de l\'ajout de la disponibilité.'
        });
      }
    );
  }

  validateEndTime() {
    const startTime = this.availabilityForm.get('start_time')?.value;
    const endTime = this.availabilityForm.get('end_time')?.value;

    if (startTime && endTime && startTime >= endTime) {
      this.availabilityForm.setErrors({ endTimeInvalid: true });
    } else {
      this.availabilityForm.setErrors(null);
    }
  }
}
