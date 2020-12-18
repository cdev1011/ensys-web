import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { AddCourseFormComponent } from '../../forms/courses/add-course-form/add-course-form.component';
import { UpdateCourseFormComponent } from '../../forms/courses/update-course-form/update-course-form.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  options: FormGroup;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  
  displayedColumns: string[] = ['Id','Fullname','Enroll'];
  dataSource = new MatTableDataSource();
 
  constructor(private _requestService: requestService,public dialog: MatDialog,
    private snackBar: MatSnackBar,private _formBuilder: FormBuilder) { }

  
   
  ngOnInit() {

    this.FetchData();

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
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

}
