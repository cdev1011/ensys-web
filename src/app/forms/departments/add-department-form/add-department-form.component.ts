import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-department-form',
  templateUrl: './add-department-form.component.html',
  styleUrls: ['./add-department-form.component.css']
})

export class AddDepartmentFormComponent implements OnInit {

  constructor(private _requestService: requestService, public datepipe: DatePipe,
    public dialogRef: MatDialogRef<AddDepartmentFormComponent>) {}

  ngOnInit() {
  }

  newDepartment(form : NgForm) {
    this._requestService.newDepartment(form.value)
    .subscribe
    (
      success => {
        console.log("Inserted new Department");
        this.dialogRef.close();
      }
    )
  }

}
