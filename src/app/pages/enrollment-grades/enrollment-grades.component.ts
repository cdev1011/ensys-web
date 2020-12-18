import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { requestService } from 'src/app/services/request.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-enrollment-grades',
  templateUrl: './enrollment-grades.component.html',
  styleUrls: ['./enrollment-grades.component.css']
})
export class EnrollmentGradesComponent implements OnInit {

  imgURL: any;
  student_id: any;
  uploadForm: FormGroup;
  public imagePath;
  isEditMode = true;
  isViewMode = false;
  studentInformation: any;
  courses = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns: string[] = ['year_semester', 'course', 'enrollement_date', 'Update'];
  dataSource = new MatTableDataSource();

  SERVER_URL = "http://localhost:8000/api/students/update_profile_img";

  constructor(public datepipe: DatePipe, private route: ActivatedRoute,
    private _requestService: requestService, private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.student_id = params['student_id'];
    });

    this.FetchEnrollments();
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

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }


  viewEnrollment(id) {
    this.router.navigate(['/enrollment/grades'], { queryParams: { enrollment_id: id } });
  }

}
