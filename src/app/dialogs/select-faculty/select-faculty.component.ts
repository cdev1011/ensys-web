import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { requestService } from '../../services/request.service';
import { Comments } from '../../classes/comments';
import { AddFacultyFormComponent } from 'src/app/forms/faculty/add-faculty-form/add-faculty-form.component';
import { UpdateFacultyFormComponent } from 'src/app/forms/faculty/update-faculty-form/update-faculty-form.component';

@Component({
  selector: 'app-select-faculty',
  templateUrl: './select-faculty.component.html',
  styleUrls: ['./select-faculty.component.css']
})
export class SelectFacultyComponent implements OnInit {

  //NOTE: Columns should just include the Name, Email.
  displayedColumns: string[] = [
    'Name',
    'Designation',
    'Specialization',
    'Select'
  ];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(public matDialogRef: MatDialogRef<SelectFacultyComponent>, private _requestService: requestService, public dialog: MatDialog,
    private snackBar: MatSnackBar) {
    matDialogRef.beforeClose().subscribe(() => matDialogRef.close(this.faculty_info));
  }

  faculty_id: number;
  faculty_info: any;

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

  selectFaculty(faculty_id,faculty_fname,faculty_lname){
    this.faculty_id = faculty_id;

    this.faculty_info = {
      "faculty_id": faculty_id,
      "faculty_fullname":faculty_fname + " " + faculty_lname
    }
    this.matDialogRef.close();
  }

  FetchData() {
    this._requestService.getFaculty()
      .subscribe
      (
        data => {
          this.dataSource.data = data.data;
        }
      )
  }

}
