import { Component } from '@angular/core';
import { RouterLink, RouterModule , Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-patient-header',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule, FormsModule],
  templateUrl: './patient-header.component.html',
  styleUrl: './patient-header.component.css'
})
export class PatientHeaderComponent {
  userInfo: any = {};
  notifications: any[] = [];
  unreadNotifications: number = 0;
  showNotifications: boolean = false; 

  constructor(
    private authService: AuthService,
    private notificationService: NotificationsService,
    private router: Router,
  ) { }
  
    logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
    }

    ngOnInit() {
      this.loadUserInfo();
      this.fetchNotifications();    }
  
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

    fetchNotifications(): void {
      this.notificationService.getNotifications().subscribe((data) => {
        this.notifications = data.notifications;
        this.unreadNotifications = this.notifications.filter(n => !n.is_read).length;
      });
    }
  
    toggleNotifications(): void {
      this.showNotifications = !this.showNotifications;
    }
  
    markAsRead(notificationId: number): void {
      this.notificationService.markAsRead(notificationId).subscribe(() => {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
          notification.is_read = true;
          this.unreadNotifications--;
        }
      });
    }
}
