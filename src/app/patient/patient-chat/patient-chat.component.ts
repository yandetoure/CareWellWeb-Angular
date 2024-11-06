import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientHeaderComponent } from '../../sidebar/patient-header/patient-header.component';
import { PatientListUserComponent } from '../patient-list-user/patient-list-user.component';

@Component({
  selector: 'app-patient-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, PatientHeaderComponent],   
  templateUrl: './patient-chat.component.html',
  styleUrls: ['./patient-chat.component.css']  // Corrigez 'styleUrl' en 'styleUrls'
})
export class PatientChatComponent implements OnInit {
  discussions: any[] = [];
  totalUnreadCount: number = 0;
  messages: any[] = [];
  newMessage: string = '';
  authUserId: number = 1;
  userId!: number;

  constructor(
    private messagesService: MessagesService,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDiscussions();
  }

  loadDiscussions(): void {
    this.messagesService.getDiscussions().subscribe(
      response => {
        this.discussions = response.data;
        this.calculateUnreadMessages();
      },
      error => {
        console.error('Erreur lors du chargement des discussions', error);
        // Afficher une notification d'erreur à l'utilisateur ici
      }
    );
  }

  calculateUnreadMessages(): void {
    this.totalUnreadCount = this.discussions.reduce((acc, discussion) => acc + discussion.unread_count, 0);
  }

  autoGrow(event: Event): void {
    const textArea = event.target as HTMLTextAreaElement;
    textArea.style.height = 'auto';
    textArea.style.height = `${textArea.scrollHeight}px`;
  }

  loadMessages(userId: number): void {
    this.userId = userId;
    this.messagesService.getMessages(this.userId).subscribe(
      response => {
        this.messages = response.data;
        this.messages.forEach(message => {
          if (!message.is_read) {
            this.messagesService.markMessagesAsRead(message.id).subscribe(() => {
              message.is_read = true;
            });
          }
        });
      },
      error => {
        console.error('Erreur lors de la récupération des messages', error);
        // Afficher une notification d'erreur à l'utilisateur ici
      }
    );
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messagesService.sendMessage(this.userId, this.newMessage).subscribe(
        response => {
          this.messages.push(response.data);
          this.newMessage = '';
        },
        error => {
          console.error('Erreur lors de l\'envoi du message', error);
          // Afficher une notification d'erreur à l'utilisateur ici
        }
      );
    }
  }

  openMessages(userId: number): void {
    this.messagesService.markMessagesAsRead(userId).subscribe(
      () => {
        this.discussions = this.discussions.map(discussion => {
          if (discussion.user_id === userId) {
            discussion.unread_count = 0;
          }
          return discussion;
        });
        this.router.navigate(['/patient/messages', userId]);
      },
      error => {
        console.error('Erreur lors de la mise à jour des messages', error);
        // Afficher une notification d'erreur à l'utilisateur ici
      }
    );
  }

  startNewDiscussion(): void {
    const dialogRef = this.dialog.open(PatientListUserComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openMessages(result.id);
      }
    });
  }

  onMessageViewed(messageId: number): void {
    this.messagesService.markMessagesAsRead(messageId).subscribe();
  }
}
