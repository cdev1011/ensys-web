import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { requestService } from 'src/app/services/request.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { EnrollmentDetailDialogComponent } from 'src/app/dialogs/enrollment-detail-dialog/enrollment-detail-dialog.component';
import { EditStudentGradesComponent } from 'src/app/forms/edit-student-grades/edit-student-grades.component';



@Component({
  selector: 'app-student-enrollments',
  templateUrl: './student-enrollments.component.html',
  styleUrls: ['./student-enrollments.component.css']
})
export class StudentEnrollmentsComponent implements OnInit {

  student_id : any;

  displayedColumns: string[] = [
    'semester',
    'subject',
    'Update Grades',
    'View',
    'Remarks',
  ];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  
  constructor(private route: ActivatedRoute,private _requestService: requestService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.
    route.
    params.
    subscribe(params => {
      this.student_id = params;
      console.log(params)
    });

    this.getEnrollments();
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

  getEnrollments(){
    this._requestService.getStudentEnrollments(this.student_id.id)
    .subscribe
    (
      data => {
        this.dataSource.data = data.data;
        console.log(data.data);
      }
    )
  }

  viewEnrollmentDetail(element){
    this.dialog.open(EnrollmentDetailDialogComponent, {
      data: {
        element
      }
    })
  }
}
