import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CreateDoctorModel} from '../models/CreateDoctorModel';
import {DoctorModel} from '../models/DoctorModel';

import {VisitsListModel} from '../models/VisitsListModel';
import {TestModelResult} from '../models/TestModelResult';

@Injectable({
  providedIn: 'root'
})
export class LabolatoryTestService {

  constructor(private http: HttpClient) {  }

  addTestResult(testResult: TestModelResult): Observable<void> {
    return this.http.post<void>(environment.backendUrl + '/lab/add', testResult);
  }

 
}
