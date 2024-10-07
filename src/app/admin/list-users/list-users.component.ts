import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators'; // Importez 'map' si nécessaire
import Swal from 'sweetalert2';
import { AdminSidebarComponent } from '../../sidebar/admin-sidebar/admin-sidebar.component'; // Assurez-vous que le chemin est correct


@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AdminSidebarComponent],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'] // Assurez-vous d'utiliser 'styleUrls' (avec un 's')
})
export class ListUsersComponent {
  users: any[] = []; // Tableau pour stocker les utilisateurs

  constructor(private authService: AuthService) { }

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


  // Fonction pour afficher les détails d'un utilisateur dans un modal
  viewUser(user: any) {
    // Code pour afficher un modal avec les détails de l'utilisateur
    Swal.fire({
      title: `Détails de ${user.first_name} ${user.last_name}`,
      html: `
      <p>Prénom: ${user.first_name}</p>
      <p>Nom: ${user.last_name}</p>
      <p>Numero d'identification: ${user.identification_number}</p>
      <p>Email: ${user.email}</p>
      <p>Téléphone: ${user.phone_number}</p>
      <p>Adresse: ${user.adress}</p>
      <p>Rôle: ${user.roles.join(', ')}</p>
      `,
      showCloseButton: true,
      focusConfirm: false,
    });
  }

  // Fonction pour modifier un utilisateur
  editUser(user: any) {
    Swal.fire({
      title: 'Modifier Utilisateur',
      html: `
        <input id="edit-first-name" class="swal2-input" placeholder="Prénom" value="${user.first_name}" />
        <input id="edit-last-name" class="swal2-input" placeholder="Nom" value="${user.last_name}" />
        <input id="edit-email" class="swal2-input" placeholder="Email" value="${user.email}" />
        <input id="edit-phone-number" class="swal2-input" placeholder="Téléphone" value="${user.phone_number}" />
        <input id="edit-adress" class="swal2-input" placeholder="Adresse" value="${user.adress}" />
      `,
      preConfirm: () => {
        const firstName = (document.getElementById('edit-first-name') as HTMLInputElement).value;
        const lastName = (document.getElementById('edit-last-name') as HTMLInputElement).value;
        const identificationNumber = (document.getElementById('edit-identification-number') as HTMLInputElement).value;
        const email = (document.getElementById('edit-email') as HTMLInputElement).value;
        const phoneNumber = (document.getElementById('edit-phone-number') as HTMLInputElement).value;
        const adress = (document.getElementById('edit-adress') as HTMLInputElement).value;
  
        // Vous pouvez ajouter une validation ici si nécessaire
  
        // Code pour modifier l'utilisateur via votre service
        this.updateUser(user.id, { first_name: firstName, last_name: lastName, identification_number: identificationNumber, email, phone_number: phoneNumber, adress });
      }
    });
  }
  

  // Fonction pour confirmer la suppression d'un utilisateur
  confirmDelete(userId: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(userId); // Appel à la méthode de suppression
        Swal.fire(
          'Supprimé !',
          'L\'utilisateur a été supprimé.',
          'success'
        );
      }
    });
  }

  // Fonction pour supprimer l'utilisateur (appel à l'API)
// Fonction pour supprimer l'utilisateur (appel à l'API)
deleteUser(userId: number) {
  this.authService.deleteUser(userId).subscribe(
    (response) => {
      console.log('Utilisateur supprimé:', response);
      this.loadUsers(); // Rechargez les utilisateurs après la suppression
      Swal.fire('Succès!', 'L\'utilisateur a été supprimé.', 'success');
    },
    (error) => {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      Swal.fire('Erreur!', 'Il y a eu une erreur lors de la suppression.', 'error');
    }
  );
}


  // Fonction pour mettre à jour un utilisateur// Fonction pour mettre à jour un utilisateur
updateUser(userId: number, updatedData: any) {
  this.authService.updateUserInfo({ id: userId, ...updatedData }).subscribe(
    (response) => {
      console.log('Utilisateur mis à jour:', response);
      this.loadUsers(); // Rechargez les utilisateurs après la mise à jour
      Swal.fire('Succès!', 'L\'utilisateur a été mis à jour.', 'success');
    },
    (error) => {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      Swal.fire('Erreur!', 'Il y a eu une erreur lors de la mise à jour.', 'error');
    }
  );
}

}

