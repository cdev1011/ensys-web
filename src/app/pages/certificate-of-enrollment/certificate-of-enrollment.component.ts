import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certificate-of-enrollment',
  templateUrl: './certificate-of-enrollment.component.html',
  styleUrls: ['./certificate-of-enrollment.component.css']
})
export class CertificateOfEnrollmentComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  
  displayedColumns: string[] = ['student_id', 'student_fullname','view'];
  dataSource = new MatTableDataSource();
 
  constructor(private _requestService: requestService,public dialog: MatDialog,private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.FetchData();
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
  
  FetchData(){
    this._requestService.getStudents()
    .subscribe
    (
      data => {
        this.dataSource.data = data.data;
      }
    )
  }

  SelectStudent(data){
    this.router.navigate(['/certificate-of-enrollment-report'], { queryParams: { StudentId: data.student_id, fullname: data.student_fullname,courseCode: data.course_code} });
  }

}
