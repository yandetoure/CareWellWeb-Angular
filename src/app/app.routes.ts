import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { ProfileComponent } from './profile/profile.component';
import { DashbaordAccountantComponent } from './dashboard/dashbaord-accountant/dashbaord-accountant.component';
import { DashbaordAdminComponent } from './dashboard/dashbaord-admin/dashbaord-admin.component';
import { DashbaordDoctorComponent } from './dashboard/dashbaord-doctor/dashbaord-doctor.component';
import { DashbaordPatientComponent } from './dashboard/dashbaord-patient/dashbaord-patient.component';
import { MedicalFilesComponent } from './doctor/medical-files/medical-files.component';



export const routes: Routes = [ // Ajoute le mot-clé export ici
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'home', component: HomeComponent }, 
  { path: 'service', component: ServiceComponent }, 
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard/accountant', component: DashbaordAccountantComponent },
  { path: 'dashboard/admin', component: DashbaordAdminComponent },
  { path: 'dashboard/doctor', component: DashbaordDoctorComponent },
  { path: 'dashboard/patient', component: DashbaordPatientComponent },
  { path: 'doctor/medical-file', component: MedicalFilesComponent },

];
