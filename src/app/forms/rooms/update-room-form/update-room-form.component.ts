import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-room-form',
  templateUrl: './update-room-form.component.html',
  styleUrls: ['./update-room-form.component.sass']
})
export class UpdateRoomFormComponent implements OnInit {

  @ViewChild('myform', { static: true })
  form: NgForm

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _requestService: requestService,
  private fb : FormBuilder,public dialogRef: MatDialogRef<UpdateRoomFormComponent>,private snackBar: MatSnackBar) {}


  ngOnInit() {
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.form.controls['room_desc'].setValue(this.data.element.room_desc);
    })
  }

  update(form : NgForm) {
    var data = 
    {
        "room_id": this.data.element.room_id,
        "room_desc": form.value.room_desc
    };

     this._requestService.updateRoom(data)
    .subscribe
    (
      success => {
        console.log("Room Updated"),
        this.dialogRef.close();
      }
    )
  }

}
