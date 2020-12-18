import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.css']
})
export class AccountCreationComponent implements OnInit {

  constructor(private _requestService: requestService, public datepipe: DatePipe,) { }

  AccountTypes = [];

  ngOnInit() {
    this.fetchAccountTypes();
  }

  newAccount(form : NgForm) {
    this._requestService.newUser(form.value)
    .subscribe
    (
      success => {
        console.log("Account Created");
      }
    )
  }

  fetchAccountTypes(){
    this._requestService.getUserTypes()
    .subscribe
    (
      data => {
       this.AccountTypes = data.data;
      }
    )
  }
}
