import { Component } from '@angular/core';
import { RouterLink, RouterModule , Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-doctor-sidebar',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './doctor-sidebar.component.html',
  styleUrl: './doctor-sidebar.component.css'
})
export class DoctorSidebarComponent {
  userInfo: any = {};

constructor(
  private authService: AuthService,
  private router: Router,
) { }

ngOnInit() {
  this.loadUserInfo();
}
  logout() {
    this.authService.logout(); // Appel au service de déconnexion
    this.router.navigate(['/login']); // Redirection vers la page de connexion
  }

  loadUserInfo() {
    this.authService.getUserInfo().subscribe(
      data => {
        if (data && data.data) {
          this.userInfo = data.data;
        }
      },
      error => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur');
      }
    );
  }
}
