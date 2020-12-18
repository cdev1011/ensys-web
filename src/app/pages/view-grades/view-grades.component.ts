import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { requestService } from 'src/app/services/request.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { GradeUpdateFormComponent } from 'src/app/dialogs/grade-update-form/grade-update-form.component';

@Component({
  selector: 'app-view-grades',
  templateUrl: './view-grades.component.html',
  styleUrls: ['./view-grades.component.css']
})
export class ViewGradesComponent implements OnInit {

  
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private route: ActivatedRoute,private snackBar: MatSnackBar,
    private router: Router, private _requestService: requestService, private httpClient: HttpClient, public datepipe: DatePipe) { }

  @ViewChild('myform', { static: true })
  form: NgForm

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  //displayedColumns: string[] = ['subject_no', 'description','units','prelim','tmg','midterm','tfg','final','remarks','edit'];
  displayedColumns: string[] = ['subject_no', 'description','lec_units','lab_units','final','remarks','edit'];
  dataSource = new MatTableDataSource();

  enrollmentId: any;
  enrollmentHeader: any;
  isEditMode = true;

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.enrollmentId = params['enrollment_id'];
      this.FetchEnrollment();
    });
  }

  getEnrollmentHeader(){
    if(this.enrollmentHeader == null) return;
    else return this.enrollmentHeader;
  }

  FetchEnrollment(){
    this._requestService.getEnrollment(this.enrollmentId)
    .subscribe
    (
      data => {
        this.dataSource.data = data.data;
        this.enrollmentHeader = data.data[0].enrollment_info[0].full_enrollment_desc;
      }
    )
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
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

  editGrades(){
    this.isEditMode = !this.isEditMode;
  }

  editSubjectGrade(id){
    this.dialog.open(GradeUpdateFormComponent, {
      data: {
        id
      }
    }).afterClosed().subscribe(result => {
      this.FetchEnrollment();
    });
  }

}
