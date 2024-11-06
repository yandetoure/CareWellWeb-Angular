import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'], // Correction du nom de la propriété
})
export class ListUserComponent implements OnInit { // Implémentez OnInit
  users: any[] = [];

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<ListUserComponent>
  ) {}

  ngOnInit() {
    this.fetchUsers(); // Méthode pour récupérer les utilisateurs
  }

  fetchUsers() {
    this.authService.getUsers().subscribe(response => {
      this.users = response.data;
    });
  }

  selectUser(user: any) {
    // Fermer le modal et passer l'utilisateur sélectionné
    this.dialogRef.close(user);
  }

  closeModal() {
    // Fermer le modal sans sélectionner d'utilisateur
    this.dialogRef.close();
  }
}
