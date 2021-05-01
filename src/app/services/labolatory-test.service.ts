import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TestModelResult} from '../models/TestModelResult';
import {AvailableVisitsForCovidTestModel} from '../models/AvailableVisitsForCovidTestModel';
import {RegisterForACovidTestModel} from '../models/RegisterForACovidTestModel';

@Injectable({
  providedIn: 'root'
})
export class LabolatoryTestService {

  constructor(private http: HttpClient) {
  }

  addTestResult(testResult: TestModelResult): Observable<void> {
    return this.http.post<void>(environment.backendUrl + '/lab/add', testResult);
  }

  getAvailableVisits(visitDate: string): Observable<AvailableVisitsForCovidTestModel[]> {
    return this.http.get<AvailableVisitsForCovidTestModel[]>(environment.backendUrl + '/lab/availableVisits/' + visitDate);
  }

  registerForACovidTest(model: RegisterForACovidTestModel): Observable<void> {
    return this.http.post<void>(environment.backendUrl + '/lab/registerCovidTest', model);
  }
}
