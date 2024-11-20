import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss'],
})
export class ChatboxComponent {
  userInfo: any = {};
  isOpen = false;
  userName = '';
  userMessage = '';
  messages: { text: string; sender: string }[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.authService.getUserInfo().subscribe(
      data => {
        if (data && data.data) {
          this.userInfo = data.data;
          this.userName = this.userInfo.first_name;
          this.messages = [
            { text: `Bienvenue ${this.userName}, Comment puis-je vous aider ?`, sender: 'bot' },
          ];
        }
      },
      error => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur');
      }
    );
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (this.userMessage.trim() !== '') {
      this.messages.push({ text: this.userMessage, sender: 'user' });
      this.getBotResponse(this.userMessage);
      this.userMessage = '';
    }
  }

  getBotResponse(message: string) {
    const msg = message.toLowerCase();
    let response = 'Désolé, je n\'ai pas compris.';

    // Réponses aux salutations
    if (msg.includes('bonjour') || msg.includes('coucou') || msg.includes('salut')) {
      response = 'Bonjour ! Comment puis-je vous assister aujourd\'hui ?';
    } else if (msg.includes('bonsoir') || msg.includes('hello')) {
      response = 'Salut ! En quoi puis-je vous être utile ?';
    } else if (msg.includes('ça va ?') || msg.includes('comment tu vas ?') || msg.includes('ca va??') || msg.includes('comment vous allez ?')) {
      response = 'Je me porte à merveille et vous ? Comment vous sentez-vous aujourd\'hui ?';
    } else if (msg.includes('comment tu t\'appelles ?') || msg.includes('c\'est quoi ton nom ?') || msg.includes('ton nom')) {
      response = 'Je m\'appelle Yandé, je suis là pour vous aider si vous avez des questions';
    }

    // Réponses pour les symptômes
    else if (msg.includes('mal de tête') || msg.includes('migraine')) {
      response = 'Pour un mal de tête, reposez-vous et buvez de l\'eau. Si ça persiste, consultez un médecin.';
    } else if (msg.includes('fièvre')) {
      response = 'Restez hydraté et reposez-vous. Si la fièvre dépasse 39°C, consultez un professionnel.';
    } else if (msg.includes('je suis malade') || msg.includes('je ne me sens pas bien'))  {
      response = 'Désolé d\'entendre ça. Pouvez-vous décrire vos symptômes ?';
    } else if (msg.includes('mal de ventre')) {
      response = 'Buvez des liquides clairs. Si la douleur persiste, consultez un médecin.';
    } else if (msg.includes('covid')) {
      response = 'Si vous suspectez un cas de COVID-19, isolez-vous et contactez un centre de test.';
    } else if (msg.includes('Bpco')  || msg.includes('essouflement'  || msg.includes('dyspnée' || msg.includes('du mal à respirer')))) {
      response = 'Les symptômes de l\'asthme sont la toux, l\'essoufflement et la respiration sifflante. Consultez un médecin si nécessaire.';
    } else if (msg.includes('nausees')  || msg.includes('envie de vomir'  || msg.includes('vomir' || msg.includes('vomissements')))) {
      response = 'Les nausées et les vomissements peuvent se produire indépendamment les uns des autres, mais ils sont souvent associés. Dans la plupart des cas, ils sont anodins. Difficiles à prévenir, ils disparaissent lorsqu’on a pu traiter le mal qui en est la cause. La nausée se manifeste par une sensation désagréable de mal au cœur. Le vomissement est le rejet du contenu de l\'estomac après une contraction violente des muscles de l’abdomen et de l’estomac. Les nausées et vomissements peuvent avoir de nombreuses causes : grossesse, gastro-entérite, intoxication alimentaire, médicaments, mal des transports, migraine, hépatites, calculs biliaires, stress, etc.';
    } else if (msg.includes('asthme')  || msg.includes('essouflement'  || msg.includes('dyspnée' || msg.includes('du mal à respirer')))) {
      response = 'Les symptômes de l\'asthme sont la toux, l\'essoufflement et la respiration sifflante. Consultez un médecin si nécessaire. Je vosu propose de prendre rendez-vous aux urgences ou en Pneumologie si vous êtes déjà suivi pour Asthme, BPCO ou toute autre mala die respiratioire';
    } else if (msg.includes('tuberculose')) {
      response = 'La tuberculose peut se manifester par une toux persistante, des douleurs thoraciques et une perte de poids. Consultez rapidement un médecin.';
    } else if (msg.includes('grippe')) {
      response = 'La grippe se caractérise par la fièvre, la toux sèche et les douleurs musculaires. Reposez-vous et hydratez-vous bien.';
    }


    // Autres informations
    else if (msg.includes('horaires')) {
      response = 'Nos horaires : 8h à 18h, du lundi au vendredi.';
    } else if (msg.includes('contact')) {
      response = 'Appelez-nous au 33 889 09 09.';
    } else if (msg.includes('urgence')) {
      response = 'En cas d\'urgence, contactez le 112 ou prenez rendez-vous immédiatement.';
    }

    this.messages.push({ text: response, sender: 'bot' });
  }
}
