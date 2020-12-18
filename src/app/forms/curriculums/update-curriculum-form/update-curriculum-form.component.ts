import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

export interface Year {
  curriculum_year: number;
}

@Component({
  selector: 'app-update-curriculum-form',
  templateUrl: './update-curriculum-form.component.html',
  styleUrls: ['./update-curriculum-form.component.sass']
})
export class UpdateCurriculumFormComponent implements OnInit {

  Courses = [];

  years: Year[] = [
  ];

  @ViewChild('myform', { static: true })
  form: NgForm

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _requestService: requestService,
  private fb : FormBuilder,public dialogRef: MatDialogRef<UpdateCurriculumFormComponent>,private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.initYearArray();
  }

  initYearArray(){
    var currentYear = (new Date()).getFullYear();
    for(var i = 1980; i <= currentYear; i++){
      let a: Year = { curriculum_year: i}
      this.years.push(a);
    }
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.fetchCourses();

      console.log(this.data);
      this.form.controls['course_id'].setValue(this.data.element.course_id);
      this.form.controls['year'].setValue(this.data.element.curriculum_year);
    })
  }

  update(form : NgForm) {
    var data = 
    {
        "curriculum_id": this.data.element.curriculum_id,
        "course_id": form.value.course_id,
        "curriculum_year": form.value.curriculum_year,
    };

     this._requestService.updateCurriculum(data)
    .subscribe
    (
      success => {
        this.dialogRef.close();
      }
    )
  }

  fetchCourses(){
    this._requestService.getCourses()
    .subscribe
    (
      data => {
       this.Courses = data.data;
      }
    )
  }


}
