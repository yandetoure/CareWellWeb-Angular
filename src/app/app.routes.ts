import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
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
import { ServicesComponent } from './admin/services/services.component';
import { ArticlesComponent } from './admin/articles/articles.component';
import { PrescriptionComponent } from './admin/prescription/prescription.component';
import { AvailabilityComponent } from './doctor/availability/availability.component';
import { AppointmentsComponent } from './patient/appointments/appointments.component';
import { AboutUsComponent } from './home/about-us/about-us.component';
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
import { PatientArticlesComponent } from './patient/patient-articles/patient-articles.component';
import { PatientServicesTestComponent } from './patient/patient-services-test/patient-services-test.component';
import { PatientArticleDetailsComponent } from './patient/patient-article-details/patient-article-details.component';
import { HomeArticlesComponent } from './home/home-articles/home-articles.component';
import { DashboardSecretaryComponent } from './dashboard/dashboard-secretary/dashboard-secretary.component';
import { AccountantPrescriptionsComponent } from './accountant/accountant-prescriptions/accountant-prescriptions.component';
import { AccountantArticlesComponent } from './accountant/accountant-articles/accountant-articles.component';
import { AccountantServicesComponent } from './accountant/accountant-services/accountant-services.component';
import { HomeServicesComponent } from './home/home-services/home-services.component';
import { PatientChatComponent } from './patient/patient-chat/patient-chat.component';
import { DoctorChatComponent } from './doctor/doctor-chat/doctor-chat.component';
import { PatientMessageComponent } from './patient/patient-message/patient-message.component';
import { AccountantTicketsComponent } from './accountant/accountant-tickets/accountant-tickets.component';
import { AccountantExamComponent } from './accountant/accountant-exam/accountant-exam.component';
import { PatientTicketsComponent } from './patient/patient-tickets/patient-tickets.component';
import { UrgentComponent } from './patient/urgent/urgent.component';
import { DoctorPrescriptionsComponent } from './doctor/doctor-prescriptions/doctor-prescriptions.component';
import { DoctorExamsComponent } from './doctor/doctor-exams/doctor-exams.component';
import { AddResultComponent } from './doctor/add-result/add-result.component';
import { ChatboxComponent } from './chatbox/chatbox.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/register' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'home', component: HomeComponent }, 
  { path: 'profile', component: ProfileComponent },
  { path: 'article-details/:id', component: ArticleDetailsComponent },
  { path: 'home/articles', component: HomeArticlesComponent},
  { path: 'home/services', component: HomeServicesComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'chatbox', component: ChatboxComponent},
  { path: 'us', component: AboutUsComponent },

  { path: 'dashboard/secretary', component: DashboardSecretaryComponent },

  // Doctor-related routes
  { path: 'dashboard/doctor', component: DashbaordDoctorComponent , canActivate: [AuthGuard], data: { role: 'Doctor' } },
  { path: 'doctor/medical-file', component: MedicalFilesComponent , canActivate: [AuthGuard], data: { role: 'Doctor' } },
  { path: 'doctor/doctors', component: DoctorsComponent , canActivate: [AuthGuard], data: { role: 'Doctor' } },
  { path: 'doctor/patients', component: PatientsComponent , canActivate: [AuthGuard], data: { role: 'Doctor' } },
  { path: 'doctor/appointment',component:DoctorAppointmentComponent , canActivate: [AuthGuard], data: { role: 'Doctor' } },
  { path: 'doctor/medicalfile', component: DoctorMedicalfileComponent, canActivate: [AuthGuard], data: { role: 'Doctor' } },
  { path: 'doctor/patient', component: DoctorPatientComponent, canActivate: [AuthGuard], data: { role: 'Doctor' } },
  { path: 'doctor/medicalfile-show/:id', component: DoctorMedicalfileShowComponent, canActivate: [AuthGuard], data: { role: 'Doctor' } },
  { path: 'doctor/chats', component: DoctorChatComponent, canActivate: [AuthGuard], data: { role: 'Doctor' } },
  { path: 'doctor/availability', component: AvailabilityComponent , canActivate: [AuthGuard], data: { role: 'Doctor' } },
  { path: 'doctor/prescriptions', component: DoctorPrescriptionsComponent , canActivate: [AuthGuard], data: { role: 'Doctor' } },
  { path: 'doctor/exams', component: DoctorExamsComponent , canActivate: [AuthGuard], data: { role: 'Doctor' } },
  {path: 'doctor/add-result/:id',  component: AddResultComponent, canActivate: [AuthGuard], data: { role: 'Doctor' } },



  // Admin routes
  { path: 'dashboard/admin', component: DashbaordAdminComponent },
  { path: 'admin/services', component: ServicesComponent,  canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/articles', component: ArticlesComponent , canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/prescriptions', component: PrescriptionComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/user', component: AddUserComponent , canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/list-users', component: ListUsersComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/appoinments', component: AdminRendezVousComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/medicalfiles', component: AdminMedicalfilesComponent , canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/medicalfile-details/:id', component: AdminMedicalfileShowComponent , canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/exams', component: AdminExamsComponent , canActivate: [AuthGuard], data: { role: 'Admin' } },

  // Doctor availability & Patient appointments
  { path: 'dashboard/patient', component: DashbaordPatientComponent , canActivate: [AuthGuard], data: { role: 'Patient' } },
  { path: 'patient/appointments', component: AppointmentsComponent , canActivate: [AuthGuard], data: { role: 'Patient' } },
  { path: 'patient/user-appointment', component: UserAppointmentComponent, canActivate: [AuthGuard], data: { role: 'Patient' } },
  { path: 'patient/medicalfile', component: MedicalfileComponent, canActivate: [AuthGuard], data: { role: 'Patient' } },
  { path: 'patient/article-details/:id', component: PatientArticleDetailsComponent, canActivate: [AuthGuard], data: { role: 'Patient' } },
  { path: 'patient/chats', component: PatientChatComponent, canActivate: [AuthGuard], data: { role: 'Patient' } },
  { path: 'patient/messages', component: PatientMessageComponent, canActivate: [AuthGuard], data: { role: 'Patient' } },
  { path: 'patient/articles', component: PatientArticlesComponent, canActivate: [AuthGuard], data: { role: 'Patient' } },
  { path: 'patient/services', component: PatientServicesTestComponent, canActivate: [AuthGuard], data: { role: 'Patient' } },
  { path: 'patient/tickets', component: PatientTicketsComponent, canActivate: [AuthGuard], data: { role: 'Patient' } },
  { path: 'patient/profil', component: PatientProfileComponent, canActivate: [AuthGuard], data: { role: 'Patient' } },
  {path: 'urgence', component: UrgentComponent, canActivate: [AuthGuard], data: { role: 'Patient' } },


  //Accountant
  { path: 'dashboard/accountant', component: DashbaordAccountantComponent , canActivate: [AuthGuard], data: { role: 'Accountant' } },
  {path: 'accountant/prescriptions', component: AccountantPrescriptionsComponent, canActivate: [AuthGuard], data: { role: 'Accountant' } },
  { path: 'accountant/articles', component: AccountantArticlesComponent, canActivate: [AuthGuard], data: { role: 'Accountant' } },
  { path: 'accountant/services', component: AccountantServicesComponent, canActivate: [AuthGuard], data: { role: 'Accountant' } },
  { path: 'accountant/tickets', component: AccountantTicketsComponent, canActivate: [AuthGuard], data: { role: 'Accountant' } },
  { path: 'accountant/exams', component: AccountantExamComponent, canActivate: [AuthGuard], data: { role: 'Accountant' } },

];
