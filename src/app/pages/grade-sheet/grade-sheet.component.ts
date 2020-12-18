import { Component, OnInit, ViewChild, Inject, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatDialogRef, MatStepper } from '@angular/material';
import { requestService } from '../../services/request.service';
import { UpdateScheduleFormComponent } from '../../forms/schedules/update-schedule-form/update-schedule-form.component';
import { Comments } from '../../classes/comments';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateNewScheduleComponent } from 'src/app/pages/create-new-schedule/create-new-schedule.component';

@Component({
  selector: 'app-grade-sheet',
  templateUrl: './grade-sheet.component.html',
  styleUrls: ['./grade-sheet.component.css']
})
export class GradeSheetComponent implements OnInit {
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

  constructor(private _requestService: requestService, public dialog: MatDialog,private router: Router,
    private snackBar: MatSnackBar) { }

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

  ShowGradeSheet(schedule,level){
    //Do student queries here with this schedule
    console.log(level);
    this.router.navigate(['/grade-sheet-report'], { queryParams: { sched_sub_id: schedule.sched_sub_id , school_year: this.school_year, college_title: this.college,
    semester: this.semester,course: this.course,level: level,course_no: schedule.course_no} });
  }



}
