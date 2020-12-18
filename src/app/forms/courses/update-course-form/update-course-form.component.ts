import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-course-form',
  templateUrl: './update-course-form.component.html',
  styleUrls: ['./update-course-form.component.css']
})
export class UpdateCourseFormComponent implements OnInit {

  majors = [];
  departments = [];

  @ViewChild('myform', { static: true })
  form: NgForm

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _requestService: requestService,
  private fb : FormBuilder,public dialogRef: MatDialogRef<UpdateCourseFormComponent>,private snackBar: MatSnackBar) {}

  ngOnInit() {
  }

  fetchDepartments(){
    this._requestService.getDepartments()
    .subscribe
    (
      data => {
       this.departments = data.data;
      }
    )
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.fetchMajors();
      this.fetchDepartments();
      console.log(this.data);
      this.form.controls['course_code'].setValue(this.data.element.course_code);
      this.form.controls['course_title'].setValue(this.data.element.course_title);
      this.form.controls['course_department'].setValue(this.data.element.department_id);
      this.form.controls['major_id'].setValue(this.data.element.major_id);
    })
  }

  update(form : NgForm) {
    var data = 
    {
        "course_id": this.data.element.course_id,
        "course_code": form.value.course_code,
        "course_title" : form.value.course_title,
        "course_department" : form.value.course_department,
        "major_id": form.value.major_id
    };

     this._requestService.updateCourse(data)
    .subscribe
    (
      success => {
        console.log("Course Updated"),
        this.dialogRef.close();
      }
    )
  }

  fetchMajors(){
    this._requestService.getMajors()
    .subscribe
    (
      data => {
       this.majors = data.data;
      }
    )
  }

}
