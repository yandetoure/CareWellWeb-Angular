import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { ProfileComponent } from './profile/profile.component';
import { DashbaordAccountantComponent } from './dashboard/dashbaord-accountant/dashbaord-accountant.component';
import { DashbaordAdminComponent } from './dashboard/dashbaord-admin/dashbaord-admin.component';
import { DashbaordDoctorComponent } from './dashboard/dashbaord-doctor/dashbaord-doctor.component';
import { DashbaordPatientComponent } from './dashboard/dashbaord-patient/dashbaord-patient.component';
import { MedicalFilesComponent } from './doctor/medical-files/medical-files.component';
import { DoctorsComponent } from './doctor/doctors/doctors.component';
import { PatientsComponent } from './doctor/patients/patients.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth/auth.component';
import { ServicesComponent } from './admin/services/services.component';
import { ArticlesComponent } from './admin/articles/articles.component';
import { PrescriptionComponent } from './admin/prescription/prescription.component';
import { AvailabilityComponent } from './doctor/availability/availability.component';
import { AppointmentsComponent } from './patient/appointments/appointments.component';

export const routes: Routes = [ // Ajoute le mot-clé export ici
    { path: '', redirectTo: '/register', pathMatch: 'full' },
    
  { path: 'home', component: HomeComponent }, 
  { path: 'service', component: ServiceComponent }, 
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard/accountant', component: DashbaordAccountantComponent },
  { path: 'dashboard/admin', component: DashbaordAdminComponent },
  { path: 'dashboard/doctor', component: DashbaordDoctorComponent },
  { path: 'dashboard/patient', component: DashbaordPatientComponent },
  { path: 'doctor/medical-file', component: MedicalFilesComponent },
  { path: 'doctor/doctors', component: DoctorsComponent },
  { path: 'patients', component: PatientsComponent},
  { path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'admin/services', component: ServicesComponent},
  { path: 'articles', component: ArticlesComponent},
  { path: 'prescriptions', component: PrescriptionComponent},
  { path: 'doctor/availability', component: AvailabilityComponent},
  { path: 'patient/appointments', component: AppointmentsComponent}

];
