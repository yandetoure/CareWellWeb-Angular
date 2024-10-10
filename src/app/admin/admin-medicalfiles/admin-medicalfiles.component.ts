import { Component } from '@angular/core';
import { MedicalFileService } from '../../services/medicalfile.service';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../../sidebar/admin-sidebar/admin-sidebar.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin-medicalfiles',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent, FormsModule],
  templateUrl: './admin-medicalfiles.component.html',
  styleUrl: './admin-medicalfiles.component.css'
})
export class AdminMedicalfilesComponent {

  medicalfiles: any[] = []; 
  filteredMedicalFiles: any[] = []; // Liste filtrée des dossiers
  searchQuery: string = ''; // Valeur de la recherche

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
        console.log('Données récupérées :', data); // Ajoutez cette ligne pour voir la réponse
        this.medicalfiles = data.data; // Vérifiez que data.data contient bien les dossiers
      },
      error: (error) => {
        console.error('Erreur lors du chargement des dossiers médicaux', error);
      }
    });
  }
  searchMedicalFiles(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredMedicalFiles = [];  // Si la recherche est vide, ne rien afficher
    } else {
      this.filteredMedicalFiles = this.medicalfiles.filter(file =>
        (file.user?.first_name + ' ' + file.user?.last_name).toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        file.identification_number.includes(this.searchQuery)
      );
    }
  }
  goToMedicalFileDetails(id: string): void {
    this.router.navigate(['/admin/medicalfile-details', id]);
  }
  

}