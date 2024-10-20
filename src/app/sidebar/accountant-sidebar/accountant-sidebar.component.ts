import { Component } from '@angular/core';
import { RouterLink, RouterModule , Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-accountant-sidebar',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './accountant-sidebar.component.html',
  styleUrl: './accountant-sidebar.component.css'
})
export class AccountantSidebarComponent {

    constructor(
      private authService: AuthService,
      private router: Router,
    ) { }
    
      logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
  }
  
