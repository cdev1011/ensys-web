import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort,MatDialog, MAT_DIALOG_DATA,MatSnackBar, MatDialogRef } from '@angular/material';
import { requestService } from '../../services/request.service';
import { UpdateSemesterFormComponent } from '../../forms/semesters/update-semester-form/update-semester-form.component';
import { AddSemesterFormComponent } from 'src/app/forms/semesters/add-semester-form/add-semester-form.component';

@Component({
  selector: 'app-semesters',
  templateUrl: './semesters.component.html',
  styleUrls: ['./semesters.component.css']
})
export class SemestersComponent implements OnInit {

  displayedColumns: string[] = ['Semester', 'Update', 'Delete'];
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
    this.dialog.open(AddSemesterFormComponent).afterClosed()
    .subscribe(result => {
      this.FetchData();
    });;
  }

  UpdateItem(element) {
    this.dialog.open(UpdateSemesterFormComponent, {
      data: {
        element
      }
    }).afterClosed().subscribe(result => {
      this.FetchData();
    });
  }

  DeleteSemester(id){
    console.log(id + " Will be deleted");
    this._requestService.deleteSemester(id)
    .subscribe
    (
      data => {
        if(data == "success") this.FetchData();
        else alert("Failed to delete");

        console.log(data);
      }
    )
  }

  FetchData(){
    this._requestService.getSemesters()
    .subscribe
    (
      data => {
        console.log(data);
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
