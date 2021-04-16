import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NurseService} from '../../../services/nurse.service';
import {Router} from '@angular/router';
import {RecaptchaService} from '../../../services/recaptcha.service';
import {ToastrService} from 'ngx-toastr';
import jwtDecode from 'jwt-decode';
import {EditNurseDataModel} from '../../../models/EditNurseDataModel';
import {NurseModel} from '../../../models/NurseModel';
import {UserLoginDataModel} from '../../../models/UserLoginDataModel';

@Component({
  selector: 'app-nurse-account-data',
  templateUrl: './nurse-account-data.component.html',
  styleUrls: ['./nurse-account-data.component.scss']
})
export class NurseAccountDataComponent implements OnInit {

  registerForm: any;
  editNurseAccount = new EditNurseDataModel();
  initNurseModel = new NurseModel();

  constructor(private formBuilder: FormBuilder, private nurseService: NurseService, private router: Router,
              private recaptchaService: RecaptchaService, private toastr: ToastrService) {
    this.initNurseModel.userLoginDataEntity = new UserLoginDataModel();
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.minLength(6)]],
      passwordRepeated: ['', [Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    console.log(jwtDecode(sessionStorage.getItem('token')));
    // @ts-ignore
    this.nurseService.getNurseAccountById(jwtDecode(sessionStorage.getItem('token')).user_id).subscribe(value => {
      this.initNurseModel = value;
    });
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.registerForm.controls;
  }

  sendForm(): void {
    if (!this.checkIfBothPasswordsAreTheSame()) {
      return;
    }

    if (this.registerForm.invalid) {
      (Object as any).values(this.registerForm.controls).forEach(control => {
        control.markAsTouched();
      });
      this.toastr.error('Niepoprawny form');
      return;
    }

    this.editNurseAccount.nurseId = this.initNurseModel.id;
    this.editNurseAccount.password = this.registerForm.controls.password.value;

    this.nurseService.editNurseAccount(this.editNurseAccount).subscribe(() => {
      this.toastr.success('Haslo zostalo zmienione!');
      this.router.navigate(['/home']);
    }, error1 => {
      console.log('BLAD' + error1.error);
    });
  }

  checkIfBothPasswordsAreTheSame(): boolean {
    if (this.registerForm.controls.password.value !== this.registerForm.controls.passwordRepeated.value) {
      this.toastr.error('Wprowadzone hasla są różne!');
      return false;
    }
    return true;
  }
}
