import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

    private apiUrl = 'http://localhost:8000/api';
  
    constructor(private http: HttpClient) {}
  
    getNotifications(): Observable<{ notifications: Notification[] }> {
      return this.http.get<{ notifications: Notification[] }>(`${this.apiUrl}/notifications`);
    }
  
    markAsRead(notificationId: number): Observable<any> {
      return this.http.post(`${this.apiUrl}/notifications/${notificationId}/mark-as-read`, {});
    }

    deleteNotification(notificationId: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/notifications/${notificationId}`);
    }
    
  }