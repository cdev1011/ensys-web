import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-update-major-form',
  templateUrl: './update-major-form.component.html',
  styleUrls: ['./update-major-form.component.sass']
})
export class UpdateMajorFormComponent implements OnInit {

  @ViewChild('myform', { static: true })
  form: NgForm

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _requestService: requestService,
  private fb : FormBuilder,public dialogRef: MatDialogRef<UpdateMajorFormComponent>,private snackBar: MatSnackBar) {}


  ngOnInit() {
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.form.controls['major_desc'].setValue(this.data.element.major_desc);
    })
  }

  update(form : NgForm) {
    var data = 
    {
        "major_id": this.data.element.major_id,
        "major_desc": form.value.major_desc
    };

     this._requestService.updateMajor(data)
    .subscribe
    (
      success => {
        console.log("Major Updated"),
        this.dialogRef.close();
      }
    )
  }

}
