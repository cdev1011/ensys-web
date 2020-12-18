import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { AddCourseFormComponent } from '../../forms/courses/add-course-form/add-course-form.component';
import { UpdateCourseFormComponent } from '../../forms/courses/update-course-form/update-course-form.component';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  options: FormGroup;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  
  displayedColumns: string[] = ['Id','Fullname','Enroll'];
  dataSource = new MatTableDataSource();
  myForm: FormGroup;
  constructor(private _requestService: requestService,public dialog: MatDialog,
    private snackBar: MatSnackBar,private fb: FormBuilder) { }

  
  ngOnInit() {

    this.FetchData();

    this.firstFormGroup = this.fb.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['']
    });
    
    
    this.myForm = this.fb.group({
      student_id: [''],
      checkBox: new FormArray([])
    })
    
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
  
  studentSelect(student_id : number){
    this.myForm.controls['student_id'].setValue(student_id);
  }

  submitEnrollment(){
    this._requestService.newEnrollment(this.myForm.value)
    .subscribe
    (
      data => {
        console.log(data);
      }
    )
  }


}
