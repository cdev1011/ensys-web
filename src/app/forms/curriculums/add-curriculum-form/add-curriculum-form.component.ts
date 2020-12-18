import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

export interface Year {
  value: number;
}

@Component({
  selector: 'app-add-curriculum-form',
  templateUrl: './add-curriculum-form.component.html',
  styleUrls: ['./add-curriculum-form.component.css']
})
export class AddCurriculumFormComponent implements OnInit {

 
  years: Year[] = [
  ];

  courses = [];

  constructor(private _requestService: requestService, public datepipe: DatePipe,
    public dialogRef: MatDialogRef<AddCurriculumFormComponent>) {}

    ngOnInit() {
      this.fetchCourses();
      this.initYearArray();

    }

    initYearArray(){
      var currentYear = (new Date()).getFullYear();
      for(var i = 1980; i <= currentYear; i++){
        let a: Year = { value: i}
        this.years.push(a);
      }
    }
  
    newCurriculum(form : NgForm) {
      this._requestService.newCurriculum(form.value)
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
         this.courses = data.data;
        }
      )
    }
}
