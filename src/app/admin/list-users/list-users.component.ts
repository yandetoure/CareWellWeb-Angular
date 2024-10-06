import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators'; // Importez 'map' si nécessaire

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'] // Assurez-vous d'utiliser 'styleUrls' (avec un 's')
})
export class ListUsersComponent {
  users: any[] = []; // Tableau pour stocker les utilisateurs

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.authService.getUsers().subscribe(
      (response: any) => {
        this.users = response; // Assurez-vous que 'response' est un tableau
      },
      (error: any) => {
        console.error('Erreur lors du chargement des utilisateurs', error);
      }
    );
  }
}
