import { Component, OnInit, ViewChild, Inject, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatDialogRef, MatStepper } from '@angular/material';
import { requestService } from '../../services/request.service';
import { UpdateScheduleFormComponent } from '../../forms/schedules/update-schedule-form/update-schedule-form.component';
import { Comments } from '../../classes/comments';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateNewScheduleComponent } from 'src/app/pages/create-new-schedule/create-new-schedule.component';

@Component({
  selector: 'app-select-schedule',
  templateUrl: './select-schedule.component.html',
  styleUrls: ['./select-schedule.component.css']
})
export class SelectScheduleComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  schedule_id: any;
  semesters = [];
  curriculum_id: number;
  course: string;
  currentSemester: string;

  semester: string;
  school_year: string;
  college: string;

  scheduleInfo: any;

  isShow = true;

  ScheduleColumns: string[] = ['course_title', 'school_year', 'curriculum', 'View'];
  scheduleData = new MatTableDataSource();

  scheduleSubjectColumns: string[] = ['level'];
  scheduleSubjectData: any;

  constructor(public matDialogRef: MatDialogRef<SelectScheduleComponent>, private _requestService: requestService, public dialog: MatDialog,
    private snackBar: MatSnackBar) {
    matDialogRef.beforeClose().subscribe(() => matDialogRef.close(this.scheduleInfo));
  }
  ngOnInit() {
    this.FetchScheduleList();
  }


  FetchScheduleList() {
    this._requestService.getSchedules()
      .subscribe
      (
        data => {
          this.scheduleData.data = data.data;
        }
      )
  }

  ngAfterViewInit() {
    this.scheduleData.paginator = this.paginator;
    this.scheduleData.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.scheduleData.filter = filterValue;
  }

  goForward(stepper: MatStepper,id) {
    this.schedule_id = id;
    this.getSemesters();
    this.getScheduleInfo();
    stepper.next();
  }


  filterBySemester(form: NgForm) {
    this.currentSemester = form.value.semester_id;
    this.fetchCurriculum();
    this.isShow = false;
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


  addNewSubject() {
    var schedId = this.schedule_id;
    this.dialog.open(CreateNewScheduleComponent, {
      data: {
        "schedule_id": schedId,
        "curriculum_id": this.curriculum_id
      }
    }).afterClosed().subscribe(result => {
      this.ngOnInit();
      this.fetchCurriculum();
    });
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

  addToList(schedule){
    console.log("Adding to list --> ID " + schedule.sched_sub_id );
    this.scheduleInfo = schedule;
    this.matDialogRef.close();
  }


}
