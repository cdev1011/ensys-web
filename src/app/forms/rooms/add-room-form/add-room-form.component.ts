import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-room-form',
  templateUrl: './add-room-form.component.html',
  styleUrls: ['./add-room-form.component.sass']
})
export class AddRoomFormComponent implements OnInit {

  constructor(private _requestService: requestService, public datepipe: DatePipe,
    public dialogRef: MatDialogRef<AddRoomFormComponent>) {}

  ngOnInit() {
  }

  newRoom(form : NgForm) {
    this._requestService.newRoom(form.value)
    .subscribe
    (
      success => {
        console.log("Inserted new Room");
        this.dialogRef.close();
      }
    )
  }

}
