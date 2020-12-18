import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-section-form',
  templateUrl: './add-section-form.component.html',
  styleUrls: ['./add-section-form.component.sass']
})
export class AddSectionFormComponent implements OnInit {

 
  constructor(private _requestService: requestService, public datepipe: DatePipe,
    public dialogRef: MatDialogRef<AddSectionFormComponent>) {}

  ngOnInit() {
  }

  newSection(form : NgForm) {
    this._requestService.newSection(form.value)
    .subscribe
    (
      success => {
        console.log("Inserted new Section");
        this.dialogRef.close();
      }
    )
  }
}
