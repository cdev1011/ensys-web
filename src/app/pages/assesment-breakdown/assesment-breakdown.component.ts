import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { requestService } from 'src/app/services/request.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-assesment-breakdown',
  templateUrl: './assesment-breakdown.component.html',
  styleUrls: ['./assesment-breakdown.component.css']
})
export class AssesmentBreakdownComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _requestService: requestService, public dialog: MatDialog, private router: Router, ) { }

  EnrollmentId: any;
  enrollmentData: any;
  feeCategories = [];
  totalUnits = 0;
  subjectsArray: any;
  semesterArray: any;
  schoolYearArray: any;
  studentInfoArray: any;
  enrollmentFee: number;
  processedBy: any;

  //computation for final 
  uponEnrollment = 3000;
  remainingBal: any;


  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.EnrollmentId = params['id'];
    });

    this.getEnrollment();
    this.fetchCategories();
  }

  getUser(){
    return this.enrollmentData[0].processed_by;
  }

  fetchCategories() {
    this._requestService.getFeeCategory()
      .subscribe
      (
        data => {
          this.feeCategories = data.data;
        }
      )
  }

  getEnrollment() {
    this._requestService.getEnrollmentAssesment(this.EnrollmentId)
      .subscribe
      (
        data => {
          this.enrollmentData = data;
          this.subjectsArray = data[0].subjects_enrolled;
          this.semesterArray = data[0].semester;
          this.schoolYearArray = data[0].school_year;
          this.studentInfoArray = data[0].student;
          this.calculateTotalUnits();
          console.log(this.enrollmentData[0]);
        }
      )
  }

  getEnrolledCourse(){
    return this.enrollmentData[0].course[0].full_course_desc;
  }

  getStudentLevel(){
    return this.studentInfoArray.level_desc;
  }

  fixTimeFormat(timeString) {
    timeString = timeString.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [timeString];

    if (timeString.length > 1) {
      timeString = timeString.slice(1);
      timeString[5] = +timeString[0] < 12 ? 'AM' : 'PM';
      timeString[0] = +timeString[0] % 12 || 12;
    }
    return timeString.join('');
  }

  calculateTotalUnits(){
    for(var i = 0; i < this.subjectsArray.length; i++){
      console.log(this.subjectsArray[i].units);
      let unitCount = this.subjectsArray[i].lab_units + this.subjectsArray[i].lec_units
      this.totalUnits = this.totalUnits + unitCount;
    }
  }
  

  getStudyLoadHeader(){
    
    if(this.enrollmentData == null) return;

    let Semester = "STUDY LOAD FOR " + this.semesterArray.semester_desc;
    let SchoolYear = " S.Y " + this.schoolYearArray.sy_start + "-" + this.schoolYearArray.sy_end;
    return Semester +  SchoolYear;
  }

  getStudentName(){

    if(this.enrollmentData == null) return;

    return this.studentInfoArray.student_fname + " " + this.studentInfoArray.student_mname + " " + this.studentInfoArray.student_lname;
  }

  getEnrollmentDate(){
    return this.enrollmentData[0].enrollment_information.enrollment_date;
  }
  

  getTotalUnits(){
    return this.totalUnits;
  }

  // getEnrolledCourse(){
  //   return this.enrollmentData[0].course.course_title;
  // }

  totalUnitFee: any;

  getTotalUnitFee(unitFee){
    let total =  this.totalUnits * unitFee;
    this.totalUnitFee = total;
    return total.toFixed(2);
  }

  getTotalEnrollmentFee(){
    console.log(this.enrollmentData[0].total_enrollment_fee.total);
    let total = this.totalUnitFee + Number(this.enrollmentData[0].total_enrollment_fee.total);
    console.log("adding " + this.totalUnitFee + " + " + this.enrollmentData[0].total_enrollment_fee.total);
    console.log("total is " + total);

    this.remainingBal = (total - 3000) / 3;
    return total.toFixed(2);
  }

  getRemainingBal(){
    return this.remainingBal.toFixed(2);
  }

  objectKeys(obj) {
    return Object.keys(obj);
  }
}
