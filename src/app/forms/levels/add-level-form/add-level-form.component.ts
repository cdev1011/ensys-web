import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-level-form',
  templateUrl: './add-level-form.component.html',
  styleUrls: ['./add-level-form.component.css']
})
export class AddLevelFormComponent implements OnInit {

  constructor(private _requestService: requestService, public datepipe: DatePipe,
    public dialogRef: MatDialogRef<AddLevelFormComponent>) {}

  ngOnInit() {
  }

  newLevel(form : NgForm) {
    this._requestService.newLevel(form.value)
    .subscribe
    (
      success => {
        console.log("Inserted new Level");
        this.dialogRef.close();
      }
    )
  }
}
