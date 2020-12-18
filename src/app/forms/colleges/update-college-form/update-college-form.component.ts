import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-college-form',
  templateUrl: './update-college-form.component.html',
  styleUrls: ['./update-college-form.component.sass']
})
export class UpdateCollegeFormComponent implements OnInit {

  @ViewChild('myform', { static: true })
  form: NgForm

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _requestService: requestService,
  private fb : FormBuilder,public dialogRef: MatDialogRef<UpdateCollegeFormComponent>,private snackBar: MatSnackBar) {}


  ngOnInit() {
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.form.controls['college_desc'].setValue(this.data.element.college_desc);
    })
  }

  update(form : NgForm) {
    var data = 
    {
        "college_id": this.data.element.college_id,
        "college_desc": form.value.college_desc
    };

     this._requestService.updateColleges(data)
    .subscribe
    (
      success => {
        console.log("College Updated"),
        this.dialogRef.close();
      }
    )
  }

}
