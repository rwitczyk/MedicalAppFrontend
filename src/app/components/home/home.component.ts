import {Component, OnInit} from '@angular/core';
import {AdService} from '../../services/ad.service';
import {AdItem} from '../../models/ad-item';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ads: AdItem[];
  role = 'Temp';

  constructor(private adService: AdService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    let token = sessionStorage.getItem('token');
    if (token) {
      // @ts-ignore
      this.role = jwtDecode(token).role;
    }

    this.ads = this.adService.getAds();
  }
}
