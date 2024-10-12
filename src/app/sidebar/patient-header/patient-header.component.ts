import { Component } from '@angular/core';
import { RouterLink, RouterModule , Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-patient-header',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './patient-header.component.html',
  styleUrl: './patient-header.component.css'
})
export class PatientHeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }
  
    logout() {
      this.authService.logout(); // Appel au service de déconnexion
      this.router.navigate(['/login']); // Redirection vers la page de connexion
    }

}
