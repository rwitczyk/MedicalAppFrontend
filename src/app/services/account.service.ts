import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
  }

  activatePatientAccount(id: number): Observable<void> {
    return this.http.get<void>(environment.backendUrl + '/patient/activateAccount/' + id);
  }

  disablePatientAccount(id: number): Observable<void> {
    return this.http.get<void>(environment.backendUrl + '/patient/deactivateAccount/' + id);
  }

  activateDoctorAccount(id: number): Observable<void> {
    return this.http.get<void>(environment.backendUrl + '/doctor/activateAccount/' + id);
  }

  disableDoctorAccount(id: number): Observable<void> {
    return this.http.get<void>(environment.backendUrl + '/doctor/deactivateAccount/' + id);
  }

  activateNurseAccount(id: number): Observable<void> {
    return this.http.get<void>(environment.backendUrl + '/nurse/activateAccount/' + id);
  }

  disableNurseAccount(id: number): Observable<void> {
    return this.http.get<void>(environment.backendUrl + '/nurse/deactivateAccount/' + id);
  }

  activateAccountByLink(token: string): Observable<void> {
    return this.http.get<void>(environment.backendUrl + '/patient/confirmAccount/' + token);
  }
}
