import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort,MatDialog, MAT_DIALOG_DATA,MatSnackBar, MatDialogRef } from '@angular/material';
import { requestService } from '../../services/request.service';
import { Comments } from '../../classes/comments';
import { DeleteRecordDialogComponent } from '../../dialogs/delete-record-dialog/delete-record-dialog.component';
import { AddSubjectFormComponent } from '../../forms/subjects/add-subject-form/add-subject-form.component';
import { UpdateSubjectFormComponent } from '../../forms/subjects/update-subject-form/update-subject-form.component';
import { Identifiers } from '@angular/compiler';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  displayedColumns: string[] = ['course_number','descriptive_title','update','delete'];
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
    this.dialog.open(AddSubjectFormComponent).afterClosed()
    .subscribe(result => {
      this.FetchData();
    });;
  }

  UpdateItem(element) {
    this.dialog.open(UpdateSubjectFormComponent, {
      data: {
        element
      }
    }).afterClosed().subscribe(result => {
      this.FetchData();
    });
  }

  DeleteSubject(id){
    this._requestService.deleteSubject(id)
    .subscribe
    (
      data => {
        if(data == "success") this.FetchData();
        else alert("Failed to delete");
      }
    )
  }

  FetchData(){
    this._requestService.getSubjects()
    .subscribe
    (
      data => {
        this.dataSource.data = data.data;
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}


