import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { AddCourseFormComponent } from '../../forms/courses/add-course-form/add-course-form.component';
import { UpdateCourseFormComponent } from '../../forms/courses/update-course-form/update-course-form.component';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  
  displayedColumns: string[] = ['course_code','course_title','course_desc','major_desc','Update','Delete'];
  dataSource = new MatTableDataSource();
 
  constructor(private _requestService: requestService,public dialog: MatDialog,
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
    this._requestService.getCourses()
    .subscribe
    (
      data => {
        this.dataSource.data = data.data;
      }
    )
  }

  newRecord() {
    this.dialog.open(AddCourseFormComponent).afterClosed()
    .subscribe(result => {
      this.FetchData();
    });;
  }
  
  UpdateItem(element) {
    this.dialog.open(UpdateCourseFormComponent, {
      data: {
        element
      }
    }).afterClosed().subscribe(result => {
      this.FetchData();
    });
  }

  DeleteCourse(id){
    this._requestService.deleteCourse(id)
    .subscribe
    (
      data => {
        if(data == "success") this.FetchData();
        else alert("Failed to delete");
      }
    )
  }

}
