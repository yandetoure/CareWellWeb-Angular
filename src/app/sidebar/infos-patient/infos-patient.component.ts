import { Component } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-infos-patient',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule, FormsModule],
  templateUrl: './infos-patient.component.html',
  styleUrls: ['./infos-patient.component.css']
})
export class InfosPatientComponent {
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
    this.fetchNotifications();
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

  deleteNotification(notificationId: number): void {
    this.notificationService.deleteNotification(notificationId).subscribe(() => {
      // Supprimer la notification de la liste localement
      this.notifications = this.notifications.filter(n => n.id !== notificationId);
      // Mettre à jour le nombre de notifications non lues
      this.unreadNotifications = this.notifications.filter(n => !n.is_read).length;
    }, error => {
      console.error('Erreur lors de la suppression de la notification', error);
    });
  }
}
