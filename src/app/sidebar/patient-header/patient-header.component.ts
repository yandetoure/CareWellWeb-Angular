import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-header',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './patient-header.component.html',
  styleUrl: './patient-header.component.css'
})
export class PatientHeaderComponent {

  constructor(private authService: AuthService) {}


//deconnexion
logout(){
  this.authService.logout();
}

}
