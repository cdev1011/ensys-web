import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-signatory',
  templateUrl: './new-signatory.component.html',
  styleUrls: ['./new-signatory.component.css']
})
export class NewSignatoryComponent implements OnInit {

  signatoryTypes = [];
  constructor(private _requestService: requestService, public datepipe: DatePipe,
    public dialogRef: MatDialogRef<NewSignatoryComponent>) {}

  ngOnInit() {
    this.fetchSignatories();
  }

  newSignatory(form : NgForm) {
    this._requestService.newSignatory(form.value)
    .subscribe
    (
      success => {
        console.log(success);
        this.dialogRef.close();
      }
    )
  }


  fetchSignatories(){
    this._requestService.getSignatoryTypes()
    .subscribe
    (
      data => {
       this.signatoryTypes = data.data;
      }
    )
  }


}
