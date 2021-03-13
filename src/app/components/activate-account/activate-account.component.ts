import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  constructor(private accountService: AccountService, private router: ActivatedRoute, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.accountService.activateAccountByLink(this.router.snapshot.paramMap.get('token')).subscribe(() =>
        this.toastr.success('Aktywowano'),
      error1 => console.log(error1.error));
  }

}
