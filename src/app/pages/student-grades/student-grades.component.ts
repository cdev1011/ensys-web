import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-student-grades',
  templateUrl: './student-grades.component.html',
  styleUrls: ['./student-grades.component.css']
})
export class StudentGradesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  
  displayedColumns: string[] = ['student_id', 'student_fullname','view'];
  dataSource = new MatTableDataSource();

  studentTypeFlag: any;
 
  constructor(private _requestService: requestService,public dialog: MatDialog,private router: Router,private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.studentTypeFlag = params['flag'];
      console.log("Your flag is " + this.studentTypeFlag);
      this.FetchData();
    });
  }

  getListType(){
    if(this.studentTypeFlag == 1){
      return "Transferee/Shifter"
    }else{
      return "Student";
    }
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
    this._requestService.getStudentList(this.studentTypeFlag)
    .subscribe
    (
      data => {
        this.dataSource.data = data.data;
      }
    )
  }

  SelectStudent(id){
    this.router.navigate(['/enrollment/list'], { queryParams: { student_id: id} });
  }

}
