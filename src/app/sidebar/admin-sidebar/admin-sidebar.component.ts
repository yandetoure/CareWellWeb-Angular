import { Component } from '@angular/core';
import { RouterLink, RouterModule , Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }
  
    logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
    
}
