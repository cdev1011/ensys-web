import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatStepper } from '@angular/material';
import { CreateNewScheduleComponent } from 'src/app/pages/create-new-schedule/create-new-schedule.component';
import { ActivatedRoute, Router } from '@angular/router';
import { requestService } from 'src/app/services/request.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-select-subject-view',
  templateUrl: './select-subject-view.component.html',
  styleUrls: ['./select-subject-view.component.css']
})
export class SelectSubjectViewComponent implements OnInit {



  constructor(public matDialogRef: MatDialogRef<CreateNewScheduleComponent>, private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any,
    private _requestService: requestService, public dialog: MatDialog, private router: Router, private _formBuilder: FormBuilder, private snackBar: MatSnackBar) { 
      matDialogRef.beforeClose().subscribe(() => matDialogRef.close(this.selectedSubject));}


  selectedSubject: any;
  curr_id: any;
  year: string;
  college: string;
  major: string;
  course: string;
  curriculumData: any;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.curr_id = this.data.curr_id;
      this.fetchCurriculum();
    });
  }

  selectSubject(id) {
    this.selectedSubject = id;
    this.matDialogRef.close();
  }

  objectKeys(obj) {
    return Object.keys(obj);
  }

  fetchCurriculum() {
    this._requestService.getCurriculumView(this.curr_id)
      .subscribe
      (
        data => {
          this.year = data.curriculum_info.curriculum_year;
          this.college = data.course_info.course_title;
          this.course = data.course_info.course_desc;
          this.curriculumData = data.list;
          console.log(data);
        }
      )
  }

  getYear() {
    return this.year;
  }

  getCollege() {
    return this.college;
  }

  getCourse() {
    return this.course;
  }

  getMajor() {
    if (this.major != null) return "Major in " + this.major;
    else return null;

  }
}
