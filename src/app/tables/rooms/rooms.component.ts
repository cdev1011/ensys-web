import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort,MatDialog, MAT_DIALOG_DATA,MatSnackBar, MatDialogRef } from '@angular/material';
import { requestService } from '../../services/request.service';
import { Comments } from '../../classes/comments';
import { UpdateRoomFormComponent } from 'src/app/forms/rooms/update-room-form/update-room-form.component';
import { AddRoomFormComponent } from 'src/app/forms/rooms/add-room-form/add-room-form.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  displayedColumns: string[] = ['Room Name','Update', 'Delete'];
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
      this.dialog.open(AddRoomFormComponent).afterClosed()
      .subscribe(result => {
        this.FetchData();
      });;
    }
  
    UpdateItem(element) {
      this.dialog.open(UpdateRoomFormComponent, {
        data: {
          element
        }
      }).afterClosed().subscribe(result => {
        this.FetchData();
      });
    }
  
    DeleteRoom(id){
      console.log(id + " Will be deleted");
      this._requestService.deleteRoom(id)
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
      this._requestService.getRooms()
      .subscribe
      (
        data => {
          this.dataSource.data = data.data;
        }
      )
    }
  

}
