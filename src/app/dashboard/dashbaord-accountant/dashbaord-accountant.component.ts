import { Component } from '@angular/core';
import { AccountantSidebarComponent } from '../../sidebar/accountant-sidebar/accountant-sidebar.component'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-dashbaord-accountant',
  standalone: true,
  imports: [AccountantSidebarComponent],
  templateUrl: './dashbaord-accountant.component.html',
  styleUrl: './dashbaord-accountant.component.css'
})
export class DashbaordAccountantComponent {

}
