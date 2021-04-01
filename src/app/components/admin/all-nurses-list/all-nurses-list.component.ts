import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AccountService} from '../../../services/account.service';
import {NurseService} from '../../../services/nurse.service';
import {NurseModel} from '../../../models/NurseModel';

@Component({
  selector: 'app-all-nurses-list',
  templateUrl: './all-nurses-list.component.html',
  styleUrls: ['./all-nurses-list.component.scss']
})
export class AllNursesListComponent implements OnInit {

  constructor(private toastr: ToastrService, private accountService: AccountService, private nurseService: NurseService) {
  }

  nursesList: NurseModel[];
  headElements = ['id', 'imie', 'nazwisko', 'email', 'aktywne', 'akcja'];

  ngOnInit(): void {
    this.nurseService.getAllNurses().subscribe(value => {
      this.nursesList = value;
    });
  }

  enableAccount(id: number): void {
    this.accountService.activateNurseAccount(id).subscribe(() => {
      this.toastr.success('Konto zostalo aktywowane!');
      this.ngOnInit();
    });
  }

  disableAccount(id: number): void {
    this.accountService.disableNurseAccount(id).subscribe(() => {
      this.toastr.success('Konto zostalo dezaktywowane!');
      this.ngOnInit();
    });
  }

}
