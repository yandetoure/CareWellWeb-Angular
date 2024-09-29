import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../../sidebar/admin-sidebar/admin-sidebar.component'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-dashbaord-admin',
  standalone: true,
  imports: [AdminSidebarComponent],
  templateUrl: './dashbaord-admin.component.html',
  styleUrl: './dashbaord-admin.component.css'
})
export class DashbaordAdminComponent {

}
