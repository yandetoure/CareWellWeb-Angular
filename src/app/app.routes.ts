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
import { PageComponent } from './home/page/page.component';
import { AboutUsComponent } from './home/about-us/about-us.component';
import { BannerComponent } from './home/banner/banner.component';
import { ContactsComponent } from './home/contacts/contacts.component';
import { PatientProfileComponent } from './patient/patient-profile/patient-profile.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { ListUsersComponent } from './admin/list-users/list-users.component';
import { DoctorAppointmentComponent } from './doctor/doctor-appointment/doctor-appointment.component';
import { AccountablePrescriptionsComponent } from './accountable/accountable-prescriptions/accountable-prescriptions.component';

// Routes array - corrected
export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' }, // Default route
  
  { path: 'home', component: HomeComponent }, 
  { path: 'service', component: ServiceComponent }, 
  { path: 'profile', component: ProfileComponent },

  // Dashboard routes
  { path: 'dashboard/accountant', component: DashbaordAccountantComponent },
  { path: 'dashboard/admin', component: DashbaordAdminComponent },
  { path: 'dashboard/doctor', component: DashbaordDoctorComponent },
  { path: 'dashboard/patient', component: DashbaordPatientComponent },

  // Doctor-related routes
  { path: 'doctor/medical-file', component: MedicalFilesComponent },
  { path: 'doctor/doctors', component: DoctorsComponent },
  { path: 'patients', component: PatientsComponent },
  { path: 'doctor/appointment',component:DoctorAppointmentComponent },

  // Auth routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'auth', component: AuthComponent },

  // Admin routes
  { path: 'admin/services', component: ServicesComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'prescriptions', component: PrescriptionComponent },
  { path: 'admin/user', component: AddUserComponent },
  { path: 'admin/list-user', component: ListUsersComponent},


  // Doctor availability & Patient appointments
  { path: 'doctor/availability', component: AvailabilityComponent },
  { path: 'patient/appointments', component: AppointmentsComponent },

  // Home Page sections
  { path: 'page', component: PageComponent },
  { path: 'us', component: AboutUsComponent },

  // Example of sections (section1 to section4)
  { path: 'section1', component: PageComponent },
  { path: 'section2', component: PageComponent },
  { path: 'section3', component: PageComponent },
  { path: 'section4', component: PageComponent },

  // Patient profile
  { path: 'patient/profil', component: PatientProfileComponent},



  //Accountable routes
  { path: 'accountable/prescriptions', component: AccountablePrescriptionsComponent},

  // Default redirect if no matching route is found
  { path: '**', redirectTo: '/register' }
];
