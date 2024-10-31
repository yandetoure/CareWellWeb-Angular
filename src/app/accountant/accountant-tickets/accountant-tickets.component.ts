import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AccountantSidebarComponent } from '../../sidebar/accountant-sidebar/accountant-sidebar.component'; 
import { TicketsService } from '../../services/tickets.service';

@Component({
  selector: 'app-accountant-tickets',
  standalone: true,
  imports: [AccountantSidebarComponent, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './accountant-tickets.component.html',
  styleUrls: ['./accountant-tickets.component.css']
})
export class AccountantTicketsComponent implements OnInit {
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
    this.tiketService.getTickets().subscribe(
      (response) => {
        if (response.data) {
          this.tickets = response.data;
          console.log('Tickets:', this.tickets);
        } else {
          console.error('Erreur dans la réponse de l\'API:', response);
        }
      },
      (error) => {
        console.error('Erreur API', error);
      }
    );
  }

  // Méthode de recherche
  searchTickets() {
    if (this.searchTerm) {
      this.tickets = this.tickets.filter(ticket => 
        ticket.id.toString().includes(this.searchTerm.toLowerCase()) ||
        (ticket.prescription?.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    } else {
      this.loadTickets();
    }
  }

  // Méthodes pour le modal de détails
  openDetailsModal(ticket: any): void {
    this.selectedService = ticket;
    this.isDetailsModalOpen = true;
  }

  closeDetailsModal(): void {
    this.isDetailsModalOpen = false;
  }

  // Méthode pour mettre à jour le statut de paiement
  updatePaymentStatus(ticketId: number, isPaid: boolean) {
    Swal.fire({
      title: 'Confirmer le changement',
      text: `Voulez-vous marquer ce ticket comme ${isPaid ? 'payé' : 'non payé'} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, confirmer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tiketService.updatePaymentStatus(ticketId, isPaid).subscribe(
          (response) => {
            this.loadTickets(); // Recharger les tickets après la mise à jour
            Swal.fire('Succès!', 'Le statut du ticket a été mis à jour.', 'success');
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du statut', error);
            Swal.fire('Erreur!', 'Une erreur s\'est produite lors de la mise à jour du statut.', 'error');
          }
        );
      }
    });
  }

  // Méthode pour formater le prix
  formatPrice(price: number): string {
    return price ? price.toLocaleString('fr-FR') + ' FCFA' : '-';
  }
}
