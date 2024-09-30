import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import nécessaire pour ngModel
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { HttpClientModule } from '@angular/common/http';  // Import pour HttpClient

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],  // Ajoute HttpClientModule ici
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
