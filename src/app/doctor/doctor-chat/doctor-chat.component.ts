import { Component , OnInit} from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { ListUserComponent } from '../list-user/list-user.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorSidebarComponent } from '../../sidebar/doctor-sidebar/doctor-sidebar.component';

@Component({
  selector: 'app-doctor-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, DoctorSidebarComponent],   
  templateUrl: './doctor-chat.component.html',
  styleUrl: './doctor-chat.component.css'
})
export class DoctorChatComponent {


  discussions: any[] = [];
  totalUnreadCount: number = 0;
  users: any[] = [];

  constructor(
    private messagesService: MessagesService,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadDiscussions();
  }

  loadDiscussions() {
    this.messagesService.getDiscussions().subscribe(
      response => {
        this.discussions = response.data;
        this.calculateUnreadMessages();
        console.log('discussions');
        
      },
      error => {
        console.error('Erreur lors du chargement des discussions', error);
      }
    );
  }

  calculateUnreadMessages() {
    this.totalUnreadCount = this.discussions.reduce((acc, discussion) => acc + discussion.unread_count, 0);
  }

  getUserIds(discussions: { [key: number]: any[] }): number[] {
    return Object.keys(discussions).map(key => parseInt(key, 10));
  }

  openMessages(userId: number) {
    // Marquer les messages comme lus
    this.messagesService.markMessagesAsRead(userId).subscribe(
      () => {
        // Mise à jour des discussions localement après la réponse
        this.discussions = this.discussions.map(discussion => {
          if (discussion.user_id === userId) {
            discussion.unread_count = 0;
          }
          return discussion;
        });

        // Naviguer vers la page de messages
        this.router.navigate(['/messages', userId]);
      },
      error => {
        console.error('Erreur lors de la mise à jour des messages', error);
      }
    );
  }

  startNewDiscussion() {
    const dialogRef = this.dialog.open(ListUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openMessages(result.id);
      }
    });
  }

  UserInfo() {
    this.authService.getUsers().subscribe(response => {
      this.users = response.data;
    });
  }
}

