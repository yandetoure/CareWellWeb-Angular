import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  services: any[] = [];

  constructor(private serviceService: ServiceService){
    this.serviceService.getServices().subscribe((response: any) => {
      this.services = response;
    });
  }

}
