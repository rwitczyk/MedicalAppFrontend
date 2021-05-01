import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LogInService} from '../../services/log-in.service';
import {LogInModel} from '../../models/LogInModel';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import jwtDecode from 'jwt-decode';
import {AdService} from '../../services/ad.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: any;
  loginModel: LogInModel;

  constructor(private formBuilder: FormBuilder, private logInService: LogInService,
              private router: Router, private toastr: ToastrService, private adService: AdService) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.signInForm.controls;
  }

  getViewRoleNameByRole(roleName: string): string {
    switch (roleName) {
      case 'ROLE_PATIENT':
        return 'Pacjent';
      case 'ROLE_ADMIN':
        return 'Admin';
      case 'ROLE_DOCTOR':
        return 'Lekarz';
      case 'ROLE_NURSE':
        return 'Pielegniarka';
    }
  }

  sendForm(): void {
    if (this.signInForm.invalid) {
      (Object as any).values(this.signInForm.controls).forEach(control => {
        control.markAsTouched();
      });
      console.log('Niepoprawny form');
      return;
    }

    this.loginModel = new LogInModel();
    this.loginModel.email = this.signInForm.controls.email.value;
    this.loginModel.password = this.signInForm.controls.password.value;
    this.logInService.logIn(this.loginModel).subscribe(value => {
      // @ts-ignore
      sessionStorage.setItem('token', value.token);
      // @ts-ignore
      this.toastr.success('Zalogowano - ' + this.getViewRoleNameByRole(jwtDecode(value.token).role));
      // @ts-ignore
      this.adService.getPatientAdvertisingGroups(jwtDecode(sessionStorage.getItem('token')).user_id).subscribe(adGroups => {
        this.adService.adGroups = adGroups;
        this.router.navigate(['home']);
      });
    }, error1 => {
      this.toastr.error('Blad logowania');
      console.log(error1.error);
    });
  }

}
