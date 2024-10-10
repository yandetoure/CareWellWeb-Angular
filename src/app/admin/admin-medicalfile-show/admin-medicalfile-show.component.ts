import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalFileService } from '../../services/medicalfile.service';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../../sidebar/admin-sidebar/admin-sidebar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-medicalfile-show',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent], // Retirez ActivatedRoute de cette ligne
  templateUrl: './admin-medicalfile-show.component.html',
  styleUrls: ['./admin-medicalfile-show.component.css'] // Utilisez styleUrls ici
})
export class AdminMedicalfileShowComponent {
  medicalFile: any = null;

  constructor(
    private route: ActivatedRoute,
    private medicalFileService: MedicalFileService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMedicalFileDetails(id);
    }
  }

  loadMedicalFileDetails(id: string): void {
    this.medicalFileService.getMedicalFileById(id).subscribe({
      next: (data) => {
        this.medicalFile = data.data; // Assurez-vous que l'API renvoie les détails correctement
      },
      error: (error) => {
        console.error('Erreur lors du chargement des détails du dossier médical', error);
      }
    });
  }
}
