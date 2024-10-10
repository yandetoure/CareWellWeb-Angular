import { Component } from '@angular/core';
import { MedicalFileService } from '../../services/medicalfile.service';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../../sidebar/admin-sidebar/admin-sidebar.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-medicalfile',
  standalone: true,
  imports: [CommonModule, DoctorSidebarComponent, FormsModule],
  templateUrl: './doctor-medicalfile.component.html',
  styleUrl: './doctor-medicalfile.component.css'
})
export class DoctorMedicalfileComponent {
  medicalfiles: any[] = []; 
  filteredMedicalFiles: any[] = [];
  searchQuery: string = '';

  constructor(private medicalfilesService: MedicalFileService,
    private authService: AuthService,
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    this.loadMedicalFiles();
  }

  loadMedicalFiles(): void {
    this.medicalfilesService.getMedicalFiles().subscribe({
      next: (data) => {
        console.log('Données récupérées :', data);
        this.medicalfiles = data.data; 
      },
      error: (error) => {
        console.error('Erreur lors du chargement des dossiers médicaux', error);
      }
    });
  }
  
  goToMedicalFileDetails(id: string): void {
    this.router.navigate(['/doctor/medicalfile-show', id]);
  }
  
  searchMedicalFiles(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredMedicalFiles = []; 
    } else {
      this.filteredMedicalFiles = this.medicalfiles.filter(file =>
        (file.user?.first_name + ' ' + file.user?.last_name).toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        file.identification_number.includes(this.searchQuery)
      );
    }
  }
}