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

constructor(
  private authService: AuthService,
  private router: Router,
) { }

  logout() {
    this.authService.logout(); // Appel au service de déconnexion
    this.router.navigate(['/login']); // Redirection vers la page de connexion
  }
}
