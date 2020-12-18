import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort,MatDialog, MAT_DIALOG_DATA,MatSnackBar, MatDialogRef } from '@angular/material';
import { requestService } from '../../services/request.service';
import { Comments } from '../../classes/comments';
import { AddLevelFormComponent } from 'src/app/forms/levels/add-level-form/add-level-form.component';
import { UpdateLevelFormComponent } from 'src/app/forms/levels/update-level-form/update-level-form.component';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css']
})
export class LevelsComponent implements OnInit {

  
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
    this.dialog.open(AddLevelFormComponent).afterClosed()
    .subscribe(result => {
      this.FetchData();
    });;
  }

  UpdateItem(element) {
    this.dialog.open(UpdateLevelFormComponent, {
      data: {
        element
      }
    }).afterClosed().subscribe(result => {
      this.FetchData();
    });
  }

  DeleteLevel(id){
    console.log(id + " Will be deleted");
    this._requestService.deleteLevel(id)
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
    this._requestService.getLevels()
    .subscribe
    (
      data => {
        this.dataSource.data = data.data;
      }
    )
  }
}
