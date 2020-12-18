import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-fee-category',
  templateUrl: './new-fee-category.component.html',
  styleUrls: ['./new-fee-category.component.sass']
})
export class NewFeeCategoryComponent implements OnInit {

  constructor(private _requestService: requestService, public datepipe: DatePipe,
    public dialogRef: MatDialogRef<NewFeeCategoryComponent>) {}

  ngOnInit() {
  }

  newCategory(form : NgForm) {
    this._requestService.newFeeCategory(form.value)
    .subscribe
    (
      success => {
        console.log("Inserted new Fee Category");
        this.dialogRef.close();
      }
    )
  }

}
