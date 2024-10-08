import { Component } from '@angular/core';
import { MedicalFileService } from '../../services/medicalfile.service';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../../sidebar/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin-medicalfiles',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './admin-medicalfiles.component.html',
  styleUrl: './admin-medicalfiles.component.css'
})
export class AdminMedicalfilesComponent {

  medicalfiles: any[] = []; 

  constructor(private medicalfilesService: MedicalFileService) { }

  ngOnInit(): void {
    this.loadMedicalFiles();
  }

  loadMedicalFiles(): void {
    this.medicalfilesService.getMedicalFiles().subscribe({
      next: (data) => {
        this.medicalfiles = data.data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des dossiers medicaux', error);
      }
    });
  }
}