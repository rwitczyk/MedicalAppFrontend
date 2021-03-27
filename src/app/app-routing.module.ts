import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RegisterAccountComponent} from './components/register-account/register-account.component';
import {SignInComponent} from './components/log-in/sign-in.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {AllPatientsListComponent} from './components/admin/all-patients-list/all-patients-list.component';
import {PatientGuard} from './guard/patient.guard';
import {ActivateAccountComponent} from './components/activate-account/activate-account.component';
import {PatientAccountDataComponent} from './components/patient/patient-account-data/patient-account-data.component';
import {CreateDoctorAccountComponent} from './components/doctor/create-doctor-account/create-doctor-account.component';
import {AdminGuard} from './guard/admin.guard';
import {AllDoctorsListComponent} from './components/admin/all-doctors-list/all-doctors-list.component';
import {ReserveVisitComponent} from './components/patient/reserve-visit/reserve-visit.component';
import {AllPatientVisitsComponent} from './components/patient/all-patient-visits/all-patient-visits.component';
import {AllDoctorVisitsComponent} from './components/doctor/all-doctor-visits/all-doctor-visits.component';
import {DoctorGuard} from './guard/doctor.guard';
import {CreateNurseAccountComponent} from './components/nurse/create-nurse-account/create-nurse-account.component';
import {AllNursesListComponent} from './components/admin/all-nurses-list/all-nurses-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'registerPatientAccount', component: RegisterAccountComponent},
  {path: 'registerDoctorAccount', component: CreateDoctorAccountComponent, canActivate: [AdminGuard]},
  {path: 'registerNurseAccount', component: CreateNurseAccountComponent, canActivate: [AdminGuard]},
  {path: 'signIn', component: SignInComponent},
  {path: 'allPatientsList', component: AllPatientsListComponent, canActivate: [AdminGuard]},
  {path: 'allDoctorsList', component: AllDoctorsListComponent, canActivate: [AdminGuard]},
  {path: 'allNursesList', component: AllNursesListComponent, canActivate: [AdminGuard]},
  {path: 'activateAccount/:token', component: ActivateAccountComponent},
  {path: 'patientAccountData', component: PatientAccountDataComponent, canActivate: [PatientGuard]},
  {path: 'reserveVisit', component: ReserveVisitComponent, canActivate: [PatientGuard]},
  {path: 'allPatientVisits', component: AllPatientVisitsComponent, canActivate: [PatientGuard]},
  {path: 'allDoctorVisits', component: AllDoctorVisitsComponent, canActivate: [DoctorGuard]},
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
