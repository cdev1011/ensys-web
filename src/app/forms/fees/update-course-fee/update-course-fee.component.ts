import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-course-fee',
  templateUrl: './update-course-fee.component.html',
  styleUrls: ['./update-course-fee.component.css']
})
export class UpdateCourseFeeComponent implements OnInit {

  feeTypes = [];
  courses = [];
  school_years = [];

  @ViewChild('myform', { static: true })
  form: NgForm

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _requestService: requestService,
  private fb : FormBuilder,public dialogRef: MatDialogRef<UpdateCourseFeeComponent>,private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.fetchFeeTypes();
    this.fetchCourses();
    this.fetchSchoolYear();
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.form.controls['fee_type_id'].setValue(this.data.element.fee_type_id);
      this.form.controls['price'].setValue(this.data.element.price);
      this.form.controls['course_id'].setValue(this.data.element.course_id);
      this.form.controls['sy_id'].setValue(this.data.element.sy_id);
    })
  }

  update(form : NgForm) {
    var data = 
    {
        "course_fee_id" : this.data.element.course_fee_id,
        "fee_type_id": form.value.fee_type_id,
        "course_id": form.value.course_id,
        "sy_id": form.value.sy_id,
        "price" : form.value.price
    };
   
     this._requestService.updateCourseFees(data)
    .subscribe
    (
      success => {
        console.log("Type Updated"),
        this.dialogRef.close();
      }
    )
   }

  fetchCourses(){
    this._requestService.getCourses()
    .subscribe
    (
      data => {
       this.courses = data.data;
      }
    )
  }

  fetchFeeTypes(){
    this._requestService.getFeeTypes()
    .subscribe
    (
      data => {
       this.feeTypes = data.data;
      }
    )
  }

  fetchSchoolYear(){
    this._requestService.getSy()
    .subscribe
    (
      data => {
       this.school_years = data.data;
      }
    )
  }
}
