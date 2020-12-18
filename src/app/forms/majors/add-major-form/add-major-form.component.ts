import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-major-form',
  templateUrl: './add-major-form.component.html',
  styleUrls: ['./add-major-form.component.sass']
})
export class AddMajorFormComponent implements OnInit {

  constructor(private _requestService: requestService, public datepipe: DatePipe,
    public dialogRef: MatDialogRef<AddMajorFormComponent>) {}

  ngOnInit() {
  }

  newRoom(form : NgForm) {
    this._requestService.newMajor(form.value)
    .subscribe
    (
      success => {
        console.log("Inserted new Major");
        this.dialogRef.close();
      }
    )
  }

}
