import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-grade-update-form',
  templateUrl: './grade-update-form.component.html',
  styleUrls: ['./grade-update-form.component.css']
})
export class GradeUpdateFormComponent implements OnInit {

  @ViewChild('myform', { static: true })
  form: NgForm

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _requestService: requestService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<GradeUpdateFormComponent>, private snackBar: MatSnackBar) { }

  enrollmentData: any;

  ngOnInit() {

    this._requestService.getEnrolledSubject(this.data.id)
      .subscribe
      (
        data => {
          this.enrollmentData = data;
          // this.form.controls['prelim_grade'].setValue(data.prelim_grade);
          // this.form.controls['midterm_grade'].setValue(data.mideterm_grade);
          // this.form.controls['tfg'].setValue(data.tfg);
          // this.form.controls['tmg'].setValue(data.tmg);
          this.form.controls['final_grade'].setValue(data.final_grade);
          this.form.controls['remarks'].setValue(data.remarks);
        }
      )
  }

  ngAfterViewInit() {
  }

  update(form: NgForm) {


    //Updated: only final grades and remarks are needed for this system
    this.enrollmentData.prelim_grade = null //form.value.prelim_grade;
    this.enrollmentData.mideterm_grade = null //form.value.midterm_grade;
    this.enrollmentData.remarks = form.value.remarks;
    this.enrollmentData.tfg = null //form.value.tfg;
    this.enrollmentData.tmg = null //form.value.tmg;
    this.enrollmentData.final_grade = form.value.final_grade;

    this._requestService.updateGrades(this.enrollmentData)
      .subscribe
      (
        success => {
          console.log("Updated");
          this.dialogRef.close();
        }
      )
  }

}
