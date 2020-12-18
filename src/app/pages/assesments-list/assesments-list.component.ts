import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assesments-list',
  templateUrl: './assesments-list.component.html',
  styleUrls: ['./assesments-list.component.css']
})
export class AssesmentsListComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  
  displayedColumns: string[] = ['student_id', 'student_fullname','view'];
  dataSource = new MatTableDataSource();
 
  constructor(private _requestService: requestService,public dialog: MatDialog,
    private snackBar: MatSnackBar,private router: Router) { }

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

  SelectStudent(id){
    this.router.navigate(['/student-assesments'], { queryParams: { student_id: id } });
  }
}
