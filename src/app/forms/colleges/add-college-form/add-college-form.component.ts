import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-college-form',
  templateUrl: './add-college-form.component.html',
  styleUrls: ['./add-college-form.component.sass']
})
export class AddCollegeFormComponent implements OnInit {

  constructor(private _requestService: requestService, public datepipe: DatePipe,
    public dialogRef: MatDialogRef<AddCollegeFormComponent>) {}

  ngOnInit() {
  }

  newCollege(form : NgForm) {
    this._requestService.newCollege(form.value)
    .subscribe
    (
      success => {
        this.dialogRef.close();
      }
    )
  }

}
