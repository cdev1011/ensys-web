import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-signatory-type',
  templateUrl: './new-signatory-type.component.html',
  styleUrls: ['./new-signatory-type.component.sass']
})
export class NewSignatoryTypeComponent implements OnInit {

  constructor(private _requestService: requestService, public datepipe: DatePipe,
    public dialogRef: MatDialogRef<NewSignatoryTypeComponent>) {}

  ngOnInit() {
  }

  newCategory(form : NgForm) {
    this._requestService.newSignatoryType(form.value)
    .subscribe
    (
      success => {
        this.dialogRef.close();
      }
    )
  }

}
