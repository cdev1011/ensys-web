import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-new-fee-types',
  templateUrl: './new-fee-types.component.html',
  styleUrls: ['./new-fee-types.component.css']
})
export class NewFeeTypesComponent implements OnInit {

  categories = [];
  constructor(private _requestService: requestService, public datepipe: DatePipe,
    public dialogRef: MatDialogRef<NewFeeTypesComponent>) {}

  ngOnInit() {
    this.fetchCategories();
  }

  newType(form : NgForm) {
    console.log(form.value);
    this._requestService.newFeeType(form.value)
    .subscribe
    (
      success => {
        console.log("Inserted new Type");
        this.dialogRef.close();
      }
    )
  }

  fetchCategories(){
    this._requestService.getFeeCategory()
    .subscribe
    (
      data => {
       this.categories = data.data;
      }
    )
  }

}
