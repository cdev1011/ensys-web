import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-semester-form',
  templateUrl: './update-semester-form.component.html',
  styleUrls: ['./update-semester-form.component.css']
})

export class UpdateSemesterFormComponent implements OnInit {
  SchoolYears = [];

  @ViewChild('myform', { static: true })
  form: NgForm

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _requestService: requestService,
  private fb : FormBuilder,public dialogRef: MatDialogRef<UpdateSemesterFormComponent>,private snackBar: MatSnackBar) {}


  ngOnInit() {
    this.fetchSy();
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.form.controls['semester_desc'].setValue(this.data.element.semester_desc);
    })
  }

  update(form : NgForm) {
    var data = 
    {
        "semester_id": this.data.element.semester_id,
        "semester_desc": form.value.semester_desc,
    };

    console.log(data);

     this._requestService.updateSemester(data)
    .subscribe
    (
      success => {
        console.log("Semester Updated"),
        this.dialogRef.close();
      }
    )
  }

  fetchSy(){
    this._requestService.getSchoolYears()
    .subscribe
    (
      data => {
       this.SchoolYears = data.data;
      }
    )
  }

}
