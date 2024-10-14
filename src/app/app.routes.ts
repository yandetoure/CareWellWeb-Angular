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
import { DoctorMedicalfileComponent } from './doctor/doctor-medicalfile/doctor-medicalfile.component';
import { DoctorPatientComponent } from './doctor/doctor-patient/doctor-patient.component';
import { AdminRendezVousComponent } from './admin/admin-rendez-vous/admin-rendez-vous.component';
import { DoctorSidebarComponent } from './sidebar/doctor-sidebar/doctor-sidebar.component';
import { AdminMedicalfilesComponent } from './admin/admin-medicalfiles/admin-medicalfiles.component';
import { AdminMedicalfileShowComponent } from './admin/admin-medicalfile-show/admin-medicalfile-show.component';
import { AdminExamsComponent } from './admin/admin-exams/admin-exams.component';
import { DoctorMedicalfileShowComponent } from './doctor/doctor-medicalfile-show/doctor-medicalfile-show.component';
import { ArticleDetailsComponent } from './home/article-details/article-details.component';
import { UserAppointmentComponent } from './patient/user-appointment/user-appointment.component';
import { MedicalfileComponent } from './patient/medicalfile/medicalfile.component';


export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' }, // Default route
  
  { path: 'home', component: HomeComponent }, 
  { path: 'service', component: ServiceComponent }, 
  { path: 'profile', component: ProfileComponent },
  { path: 'article-details/:id', component: ArticleDetailsComponent },

  { path: 'dashboard/accountable', component: DashbaordAccountantComponent },
  { path: 'dashboard/admin', component: DashbaordAdminComponent },
  { path: 'dashboard/doctor', component: DashbaordDoctorComponent },
  { path: 'dashboard/patient', component: DashbaordPatientComponent },

  // Doctor-related routes
  { path: 'doctor/medical-file', component: MedicalFilesComponent },
  { path: 'doctor/doctors', component: DoctorsComponent },
  { path: 'doctor/patients', component: PatientsComponent },
  { path: 'doctor/appointment',component:DoctorAppointmentComponent },
  { path: 'doctor/medicalfile', component: DoctorMedicalfileComponent},
  { path: 'doctor/patient', component: DoctorPatientComponent},
  { path: 'doctor/medicalfile-show/:id', component: DoctorMedicalfileShowComponent},

  // Auth routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'auth', component: AuthComponent },

  // Admin routes
  { path: 'admin/services', component: ServicesComponent },
  { path: 'admin/articles', component: ArticlesComponent },
  { path: 'admin/prescriptions', component: PrescriptionComponent },
  { path: 'admin/user', component: AddUserComponent },
  { path: 'admin/list-users', component: ListUsersComponent},
  { path: 'admin/appoinments', component: AdminRendezVousComponent},
  { path: 'admin/medicalfiles', component: AdminMedicalfilesComponent },
  { path: 'admin/medicalfile-details/:id', component: AdminMedicalfileShowComponent },
  { path: 'admin/exams', component: AdminExamsComponent },

  // Doctor availability & Patient appointments
  { path: 'doctor/availability', component: AvailabilityComponent },
  { path: 'patient/appointments', component: AppointmentsComponent },
  { path: 'patient/user-appointment', component: UserAppointmentComponent},
  { path: 'patient/medicalfile', component: MedicalfileComponent},

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

  // Default redirect if no matching route is found
  { path: '**', redirectTo: '/register' }
];
