import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { requestService } from 'src/app/services/request.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { SelectScheduleComponent } from 'src/app/dialogs/select-schedule/select-schedule.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enrollment-view',
  templateUrl: './enrollment-view.component.html',
  styleUrls: ['./enrollment-view.component.css']
})
export class EnrollmentViewComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private route: ActivatedRoute,private snackBar: MatSnackBar,
    private router: Router, private _requestService: requestService, private httpClient: HttpClient, public datepipe: DatePipe) { }

  @ViewChild('myform', { static: true })
  form: NgForm

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns: string[] = ['subject_no', 'description','units','days','room','instructor','time','remove'];
  dataSource = new MatTableDataSource();

  enrollmentId: any;
  enrollmentHeader: any;

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
        console.log(data.data)
      }
    )
  }

  addScheduleToList() {

    this.dialog.open(SelectScheduleComponent)
      .afterClosed()
      .subscribe(result => {

        var subjects = {
          "enrollment_id": this.enrollmentId,
          "sched_sub_id": result.sched_sub_id
        }
  
        this._requestService.newSubjectEnrollment(subjects)
          .subscribe
          (
            data => {
              console.log(data);
              this.openSnackBar('New Schedule Enrolled!');    
              this.FetchEnrollment();
            }
          )
      });
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

  
  RemoveSchedule(id){
    this._requestService.removeEnrolledSubject(id)
    .subscribe
    (
      data => {
        this.openSnackBar('Schedule Removed');    
        this.FetchEnrollment();
      }
    )
  }


}
