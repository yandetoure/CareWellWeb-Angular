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

  getRelativeTime(date: Date | string): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
    
    let interval = Math.floor(diffInSeconds / 31536000);
    if (interval > 1) return `il y a ${interval} ans`;
    interval = Math.floor(diffInSeconds / 2592000);
    if (interval > 1) return `il y a ${interval} mois`;
    interval = Math.floor(diffInSeconds / 86400);
    if (interval > 1) return `il y a ${interval} jours`;
    interval = Math.floor(diffInSeconds / 3600);
    if (interval > 1) return `il y a ${interval} heures`;
    interval = Math.floor(diffInSeconds / 60);
    if (interval > 1) return `il y a ${interval} minutes`;
    return `il y a quelques secondes`;
  }
  loadMedicalFileDetails(id: string): void {
    this.medicalFileService.getMedicalFileById(id).subscribe({
      next: (data) => {
        this.medicalFile = data.data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des détails du dossier médical', error);
      }
    });
  }
}
