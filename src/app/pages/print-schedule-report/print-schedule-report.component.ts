import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { requestService } from 'src/app/services/request.service';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { TouchSequence } from 'selenium-webdriver';
import { AddCurriculumSubjectComponent } from '../../forms/curriculums/add-curriculum-subject/add-curriculum-subject.component';
import { NgForm } from '@angular/forms';
import { CreateNewScheduleComponent } from '../create-new-schedule/create-new-schedule.component';
import { UpdateScheduleSubjectComponent } from 'src/app/forms/schedule-subjects/update-schedule-subject/update-schedule-subject.component';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-print-schedule-report',
  templateUrl: './print-schedule-report.component.html',
  styleUrls: ['./print-schedule-report.component.css']
})
export class PrintScheduleReportComponent implements OnInit {


  constructor(private route: ActivatedRoute, private _requestService: requestService, public dialog: MatDialog, private router: Router, private snackBar: MatSnackBar) { }

  @ViewChild('table', { static: false }) table: ElementRef;
  @ViewChild('myform', { static: true })
  form: NgForm

  schedule_id: any;
  course: string;
  semesters = [];
  currentSemester: string;
  curriculum_id: number;

  semester: string;
  school_year: string;
  college: string;

  scheduleSubjectColumns: string[] = ['level'];
  scheduleSubjectData: any;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.schedule_id = params['scheduleId'];
      this.getSemesters();
      this.getScheduleInfo();
      //this.fetchCurriculum();
    });
  }

  filterBySemester(form: NgForm) {
    this.currentSemester = form.value.semester_id;
    this.fetchCurriculum();
  }

  objectKeys(obj) {
    return Object.keys(obj);
  }

  fetchCurriculum() {
    var request = {
      'schedule_id': this.schedule_id,
      "semester_id": this.currentSemester
    }

    this._requestService.getScheduleSubjects(request)
      .subscribe
      (
        data => {
          this.school_year = data.schedule_info.school_year;
          this.college = data.schedule_info.course_title;
          this.semester = data.schedule_info.semester;
          this.course = data.schedule_info.course;
          this.scheduleSubjectData = data.schedules;
        }
      )
  }

  getSemesters() {

    this._requestService.getScheduleSemesters(this.schedule_id)
      .subscribe
      (
        data => {
          this.semesters = data;
        }
      )
  }

  getScheduleInfo() {

    this._requestService.getScheduleInfo(this.schedule_id)
      .subscribe
      (
        data => {
          this.curriculum_id = data.curriculum_id;
        }
      )
  }


  getSemester() {
    return this.semester;
  }

  getCourse() {
    return this.course;
  }

  getSchoolYear() {
    return this.school_year;

  }

  getCourseTitle() {
    return this.college;

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


  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write('<html><head>  <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,500" rel="stylesheet"> ' +
      ' <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">' +
      '<link rel="icon" type="image/x-icon" href="favicon.ico">' +
      '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">' +
      '<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>' +
      '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>' +
      '<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>' +
      ' </head><body  onload="window.print()">' + printContents + '</html>');

    popupWin.document.close();
  }

  ExportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
