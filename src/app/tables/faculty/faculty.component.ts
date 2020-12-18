import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort,MatDialog, MAT_DIALOG_DATA,MatSnackBar, MatDialogRef } from '@angular/material';
import { requestService } from '../../services/request.service';
import { Comments } from '../../classes/comments';
import { AddFacultyFormComponent } from 'src/app/forms/faculty/add-faculty-form/add-faculty-form.component';
import { UpdateFacultyFormComponent } from 'src/app/forms/faculty/update-faculty-form/update-faculty-form.component';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  //NOTE: Columns should just include the Name, Email.
  displayedColumns: string[] = [
    'Name',
    'View',
    'Update',
    'Delete'
  ];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

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

  newRecord() {
    this.dialog.open(AddFacultyFormComponent).afterClosed()
    .subscribe(result => {
      this.FetchData();
    });
  }

  DeleteFaculty(id){
    console.log(id + " Will be deleted");
    this._requestService.deleteFaculty(id)
    .subscribe
    (
      data => {
        if(data == "success") this.FetchData();
        else alert("Failed to delete");

        console.log(data);
      }
    )
  }


  UpdateItem(element) {
    this.dialog.open(UpdateFacultyFormComponent, {
      data: {
        element
      }
    }).afterClosed().subscribe(result => {
      this.FetchData();
    });
  }

  FetchData(){
    this._requestService.getFaculty()
    .subscribe
    (
      data => {
        this.dataSource.data = data.data;
      }
    )
  }

}
