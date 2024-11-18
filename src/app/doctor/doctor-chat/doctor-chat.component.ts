import { Component, OnInit } from '@angular/core';
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
export class DoctorChatComponent implements OnInit {
  discussions: any[] = [];
  totalUnreadCount: number = 0;
  users: any[] = [];
  messages: any[] = [];
  selectedUserId: number | null = null;
  selectedUserName: string = '';
  newMessage: string = '';
  authUserId: number = 0;
  userId!: number;
  groupedMessages: { date: string, messages: any[] }[] = [];

  constructor(
    private messagesService: MessagesService,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // this.authUserId = this.authService.getUserId();
    this.loadDiscussions();
  }

  loadDiscussions() {
    this.messagesService.getDiscussions().subscribe(
      response => {
        this.discussions = response.data;
        this.calculateUnreadMessages();
        console.log('Discussions:', this.discussions);
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

  openMessages(userId: number) {
    this.selectedUserId = userId;
    const discussion = this.discussions.find(d => d.user_id === userId);
    if (discussion) {
      this.selectedUserName = `${discussion.user_first_name} ${discussion.user_last_name}`;
      this.loadMessages(userId);

      this.messagesService.markMessagesAsRead(userId).subscribe(
        () => {
          discussion.unread_count = 0;
        },
        error => {
          console.error('Erreur lors de la mise à jour des messages', error);
        }
      );
    }
  }

  loadMessages(userId: number) {
    this.messagesService.getMessages(userId).subscribe(
      response => {
        this.messages = response.data;
        console.log(`Messages pour l'utilisateur ${userId}:`, this.messages); 
      },
      error => {
        console.error('Erreur lors du chargement des messages', error);
      }
    );
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    this.messagesService.sendMessage(this.selectedUserId!, this.newMessage).subscribe(
      response => {
        this.messages.push(response.data);
        this.newMessage = '';
      },
      error => {
        console.error('Erreur lors de l\'envoi du message', error);
      }
    );
  }
}
