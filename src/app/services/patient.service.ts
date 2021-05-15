import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CreatePatientModel} from '../models/CreatePatientModel';
import {Observable} from 'rxjs';
import {PatientModel} from '../models/PatientModel';
import {EditPatientDataModel} from '../models/EditPatientDataModel';
import {VisitsListModel} from '../models/VisitsListModel';
import {GetAvailableVisitsModel} from '../models/GetAvailableVisitsModel';
import {ReserveVisitModel} from '../models/ReserveVisitModel';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) {
  }

  getPatientById(patientAccountId: string): Observable<PatientModel> {
    return this.http.get<PatientModel>(environment.backendUrl + '/patient/getById/' + patientAccountId);
  }

  getAllPatients(): Observable<PatientModel[]> {
    return this.http.get<PatientModel[]>(environment.backendUrl + '/patient/all');
  }
  getAllDoctorPatients(doctorAccountId: string): Observable<PatientModel[]> {
    return this.http.get<PatientModel[]>(environment.backendUrl + '/patient/all/' + doctorAccountId);
  }

  createPatientAccount(user: CreatePatientModel): Observable<CreatePatientModel> {
    return this.http.post<CreatePatientModel>(environment.backendUrl + '/patient/add', user);
  }

  editPatientAccountData(patientModel: EditPatientDataModel): Observable<void> {
    return this.http.post<void>(environment.backendUrl + '/patient/edit', patientModel);
  }

  getAllPatientVisits(patientAccountId: number): Observable<VisitsListModel[]> {
    return this.http.get<VisitsListModel[]>(environment.backendUrl + '/patient/allVisits/' + patientAccountId);
  }

  getAvailableVisits(getAvailableVisitsModel: GetAvailableVisitsModel): Observable<VisitsListModel[]> {
    return this.http.post<VisitsListModel[]>(environment.backendUrl + '/patient/availableVisits', getAvailableVisitsModel);
  }

  reserveVisit(reserveVisitModel: ReserveVisitModel): Observable<void> {
    return this.http.post<void>(environment.backendUrl + '/patient/reserveVisit', reserveVisitModel);
  }

  cancelVisit(visitId: number): Observable<void> {
    return this.http.get<void>(environment.backendUrl + '/patient/cancelVisit/' + visitId);
  }

  downloadPdf(visitId: number): Observable<Blob> {
    return this.http.get(environment.backendUrl + '/patient/downloadPdf/' + visitId, {responseType: 'blob'});
  }
}
