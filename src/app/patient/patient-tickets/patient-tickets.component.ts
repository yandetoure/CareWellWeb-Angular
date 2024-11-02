import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { TicketsService } from '../../services/tickets.service';
import { PatientHeaderComponent } from '../../sidebar/patient-header/patient-header.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-patient-tickets',
  standalone: true,
  imports: [PatientHeaderComponent, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './patient-tickets.component.html',
  styleUrl: './patient-tickets.component.css'
})
export class PatientTicketsComponent {

  tickets: any[] = [];
  newService: any = {
    name: '',
    photo: null, 
    description: '', 
  };
  searchTerm: string = '';
  selectedService: any;
  isModalOpen: boolean = false;
  isDetailsModalOpen: boolean = false;

  constructor(
    private http: HttpClient,
    private tiketService: TicketsService,
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.tiketService.getUserTickets().subscribe(      
      (response) => {
        if (response.data) {
          this.tickets = response.data;
          console.log('Tickets chargés:', this.tickets);
        } else {
          console.error('Erreur dans la réponse de l\'API:', response);
        }
      },
      (error) => {
        console.error('Erreur lors de l\'appel à l\'API:', error);
      }
    );
  }
  
  searchTickets() {
    if (!this.searchTerm) {
      this.loadTickets(); 
      return;
    }
  
    const term = this.searchTerm.toLowerCase();
  
    this.tickets = this.tickets.filter(ticket =>
      ticket.id.toString().includes(term) || 
      (ticket.prescription && ticket.prescription.name.toLowerCase().includes(term))
    );
  
    console.log('Résultats de la recherche:', this.tickets);
  }
  

  openDetailsModal(ticket: any): void {
    this.selectedService = ticket;
    this.isDetailsModalOpen = true;
  }

  closeDetailsModal(): void {
    this.isDetailsModalOpen = false;
  }

  downloadTicketAsPDF(ticket: any) {
    const doc = new jsPDF();

    // Sélectionnez la carte du ticket pour la capturer
    const ticketElement = document.getElementById(`ticket-${ticket.id}`);
    if (ticketElement) {
        html2canvas(ticketElement, { scale: 4 }).then((canvas) => { // Utiliser une échelle pour améliorer la qualité
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 180; // Largeur de l'image dans le PDF
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Ajouter l'image au PDF
            doc.addImage(imgData, 'PNG', 15, 20, imgWidth, imgHeight);

            // Vous pouvez ajouter un titre ou d'autres éléments ici si nécessaire
            doc.setFontSize(16);
            doc.text(`Veuillew garder ce ticket pour faire veloir ce que de droit.`, 15, imgHeight + 30);

            // Enregistrer le PDF
            doc.save(`Ticket_${ticket.id}.pdf`);
        });
    }
}



}