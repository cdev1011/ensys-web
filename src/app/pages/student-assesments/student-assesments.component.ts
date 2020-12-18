import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { requestService } from 'src/app/services/request.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-assesments',
  templateUrl: './student-assesments.component.html',
  styleUrls: ['./student-assesments.component.css']
})
export class StudentAssesmentsComponent implements OnInit {

  constructor(public datepipe: DatePipe, private route: ActivatedRoute,
    private _requestService: requestService, private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router) { }

  student_id: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns: string[] = ['year_semester', 'course', 'enrollement_date', 'Update'];
  dataSource = new MatTableDataSource();

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.student_id = params['student_id'];
    });

    this.FetchEnrollments();
  }


  FetchEnrollments() {
    this._requestService.getStudentEnrollments(this.student_id)
      .subscribe
      (
        data => {
          console.log(data);
          this.dataSource.data = data.data;
        }
      )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  viewAssesment(enrollmentId){
    this.router.navigate(['/assesment'], { queryParams: { id: enrollmentId } });
  }

}
