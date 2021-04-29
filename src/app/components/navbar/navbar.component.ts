import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import jwtDecode from 'jwt-decode';
import {AdService} from '../../services/ad.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  jwtToken = '';
  role = '';

  constructor(public translate: TranslateService, private toastr: ToastrService, private adService: AdService) {
    translate.addLangs(['pl', 'en', 'de']);
    translate.setDefaultLang('pl');
  }

  ngOnInit(): void {
    this.jwtToken = sessionStorage.getItem('token');
    // @ts-ignore
    this.role = jwtDecode(this.jwtToken).role;
  }

  switchLang(lang: string): void {
    this.translate.use(lang);
  }

  logOut(): void {
    sessionStorage.clear();
    this.adService.clear();
    this.ngOnInit();
    this.toastr.success('Wylogowano');
  }
}
