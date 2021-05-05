import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CreateDoctorModel} from '../models/CreateDoctorModel';
import {DoctorModel} from '../models/DoctorModel';
// @ts-ignore
import {VisitsListModel} from '../models/VisitsListModel';
import {AcceptVisitModel} from '../models/AcceptVisitModel';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) {
  }

  createDoctorAccount(user: CreateDoctorModel): Observable<CreateDoctorModel> {
    return this.http.post<CreateDoctorModel>(environment.backendUrl + '/doctor/add', user);
  }

  getAllDoctors(): Observable<DoctorModel[]> {
    return this.http.get<DoctorModel[]>(environment.backendUrl + '/doctor/all');
  }

  getAllDoctorVisits(doctorAccountId: number): Observable<VisitsListModel[]> {
    return this.http.get<VisitsListModel[]>(environment.backendUrl + '/doctor/allVisits/' + doctorAccountId);
  }

  getAllDoctorVisitsByPatient(doctorAccountId: number, patientId: number): Observable<VisitsListModel[]> {
    return this.http.get<VisitsListModel[]>(environment.backendUrl + '/doctor/allVisits/' + doctorAccountId + '/' + patientId);
  }

  acceptVisit(acceptVisitModel: AcceptVisitModel): Observable<void> {
    return this.http.post<void>(environment.backendUrl + '/doctor/acceptVisit', acceptVisitModel);
  }
}
