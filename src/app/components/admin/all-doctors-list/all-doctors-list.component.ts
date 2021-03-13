import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AccountService} from '../../../services/account.service';
import {DoctorService} from '../../../services/doctor.service';
import {DoctorModel} from '../../../models/DoctorModel';

@Component({
  selector: 'app-all-doctors-list',
  templateUrl: './all-doctors-list.component.html',
  styleUrls: ['./all-doctors-list.component.scss']
})
export class AllDoctorsListComponent implements OnInit {

  constructor(private toastr: ToastrService, private accountService: AccountService, private doctorService: DoctorService) {
  }

  doctorsList: DoctorModel[];
  headElements = ['id', 'imie', 'nazwisko', 'email', 'aktywne', 'akcja'];

  ngOnInit(): void {
    this.doctorService.getAllDoctors().subscribe(value => {
      this.doctorsList = value;
    });
  }

  enableAccount(id: number): void {
    this.accountService.activateDoctorAccount(id).subscribe(() => {
      this.toastr.success('Konto zostalo aktywowane!');
      this.ngOnInit();
    });
  }

  disableAccount(id: number): void {
    this.accountService.disableDoctorAccount(id).subscribe(() => {
      this.toastr.success('Konto zostalo dezaktywowane!');
      this.ngOnInit();
    });
  }
}
