import { Component } from '@angular/core';
import { RouterLink, RouterModule , Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-header',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule, FormsModule],

  templateUrl: './patient-header.component.html',
  styleUrl: './patient-header.component.css'
})
export class PatientHeaderComponent {
  userInfo: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }
  
    logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
    }

    ngOnInit() {
      this.loadUserInfo();
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
