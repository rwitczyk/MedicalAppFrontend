import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RecaptchaService} from '../../../services/recaptcha.service';
import {ToastrService} from 'ngx-toastr';
import {AddNurseAccountDto} from '../../../models/AddNurseAccountDto';
import {NurseService} from '../../../services/nurse.service';

@Component({
  selector: 'app-create-nurse-account',
  templateUrl: './create-nurse-account.component.html',
  styleUrls: ['./create-nurse-account.component.scss']
})
export class CreateNurseAccountComponent implements OnInit {

  registerForm: any;
  nurseModel = new AddNurseAccountDto();

  constructor(private formBuilder: FormBuilder, private nurseService: NurseService, private router: Router,
              private recaptchaService: RecaptchaService, private toastr: ToastrService) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.registerForm.controls;
  }

  sendForm(): void {
    if (this.registerForm.invalid) {
      (Object as any).values(this.registerForm.controls).forEach(control => {
        control.markAsTouched();
      });
      this.toastr.error('Niepoprawny form');
      return;
    }

    this.nurseModel.firstName = this.registerForm.controls.firstName.value;
    this.nurseModel.lastName = this.registerForm.controls.lastName.value;
    this.nurseModel.email = this.registerForm.controls.email.value;
    this.nurseModel.password = this.registerForm.controls.password.value;

    this.nurseService.addNurseAccount(this.nurseModel).subscribe(() => {
      this.toastr.success('Konto pielęgniarki zostało utworzone!');
      this.router.navigate(['/home']);
    }, error1 => {
      console.log('BLAD' + error1.error);
    });
  }

}
