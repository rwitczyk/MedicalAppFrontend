/* tslint:disable:typedef */
import {Injectable} from '@angular/core';
import {AdItem} from '../models/ad-item';
import {DentistAdComponent} from '../adds/dentist-ad.component';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor(private http: HttpClient) {
  }

  adGroups = [];
  ads = [];

  getAds() {
    console.log(this.adGroups);

    this.ads.push(new AdItem(DentistAdComponent, {url: '../assets/images/covid.png'}));

    if (this.adGroups.includes('Stomatolog')) {
      this.ads.push(new AdItem(DentistAdComponent, {url: '../assets/images/dentist.png'}));
    }
    if (this.adGroups.includes('Chirurg')) {
      this.ads.push(new AdItem(DentistAdComponent, {url: '../assets/images/surgeon.png'}));
    }

    return this.ads;
  }

  getPatientAdvertisingGroups(patientAccountId: number): Observable<string[]> {
    return this.http.get<string[]>(environment.backendUrl + '/advertising/patient/' + patientAccountId);
  }

  clear() {
    this.ads = [];
    this.adGroups = [];
  }
}
