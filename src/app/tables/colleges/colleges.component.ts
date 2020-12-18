import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort,MatDialog, MAT_DIALOG_DATA,MatSnackBar, MatDialogRef } from '@angular/material';
import { requestService } from '../../services/request.service';
import { Comments } from '../../classes/comments';
import { AddCollegeFormComponent } from 'src/app/forms/colleges/add-college-form/add-college-form.component';
import { UpdateCollegeFormComponent } from 'src/app/forms/colleges/update-college-form/update-college-form.component';



@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.css']
})
export class CollegesComponent implements OnInit {

  displayedColumns: string[] = ['Level','Update', 'Delete'];
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
    this.dialog.open(AddCollegeFormComponent).afterClosed()
    .subscribe(result => {
      this.FetchData();
    });;
  }

  UpdateItem(element) {
    this.dialog.open(UpdateCollegeFormComponent, {
      data: {
        element
      }
    }).afterClosed().subscribe(result => {
      this.FetchData();
    });
  }

  DeleteCollege(id){
    this._requestService.deleteCollege(id)
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
    this._requestService.getColleges()
    .subscribe
    (
      data => {
        this.dataSource.data = data.data;
      }
    )
  }
}
