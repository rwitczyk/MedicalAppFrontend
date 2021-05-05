import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeadersInterceptor} from './components/HttpHeadersInterceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from './components/navbar/navbar.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {RegisterAccountComponent} from './components/register-account/register-account.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {SignInComponent} from './components/log-in/sign-in.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';
import { AllPatientsListComponent } from './components/admin/all-patients-list/all-patients-list.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { PatientAccountDataComponent } from './components/patient/patient-account-data/patient-account-data.component';
import { CreateDoctorAccountComponent } from './components/doctor/create-doctor-account/create-doctor-account.component';
import { AllDoctorsListComponent } from './components/admin/all-doctors-list/all-doctors-list.component';
import { ReserveVisitComponent } from './components/patient/reserve-visit/reserve-visit.component';
import { AllPatientVisitsComponent } from './components/patient/all-patient-visits/all-patient-visits.component';
import { AllDoctorVisitsComponent } from './components/doctor/all-doctor-visits/all-doctor-visits.component';
import { CreateNurseAccountComponent } from './components/nurse/create-nurse-account/create-nurse-account.component';
import { AllNursesListComponent } from './components/admin/all-nurses-list/all-nurses-list.component';
import { NurseAccountDataComponent } from './components/nurse/nurse-account-data/nurse-account-data.component';
import { EnterTestResultComponent } from './components/nurse/enter-test-result/enter-test-result.component';
import { AdDirective } from './ad.directive';
import { AdBannerComponent } from './ad-banner/ad-banner.component';
import {DentistAdComponent} from './adds/dentist-ad.component';
import { CovidTestRegistrationComponent } from './components/covid-test-registration/covid-test-registration.component';
import { PatientVisitsHistoryComponent } from './components/doctor/patient-visits-history/patient-visits-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegisterAccountComponent,
    SignInComponent,
    ErrorPageComponent,
    AllPatientsListComponent,
    ActivateAccountComponent,
    PatientAccountDataComponent,
    CreateDoctorAccountComponent,
    AllDoctorsListComponent,
    ReserveVisitComponent,
    AllPatientVisitsComponent,
    AllDoctorVisitsComponent,
    CreateNurseAccountComponent,
    AllNursesListComponent,
    NurseAccountDataComponent,
    EnterTestResultComponent,
    CovidTestRegistrationComponent,
    AdDirective,
    AdBannerComponent,
    DentistAdComponent,
    PatientVisitsHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MDBBootstrapModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true
    }
  ],
  entryComponents: [DentistAdComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// AOT compilation support
export function httpTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
