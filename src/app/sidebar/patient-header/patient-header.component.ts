import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-patient-header',
  standalone: true,
  imports: [],
  templateUrl: './patient-header.component.html',
  styleUrl: './patient-header.component.css'
})
export class PatientHeaderComponent {

  constructor(private authService: AuthService) {}


  // logout() {
  //   this.authService.logout().subscribe(
  //     () => {
  //       this.authService.logout();
  //     },
  //     error => {
  //       console.error('Erreur lors de la deconnexion', error);
  //     }
  //   );
  // }

}
