import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';



export const routes: Routes = [ // Ajoute le mot-clé export ici
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent }, 
];
