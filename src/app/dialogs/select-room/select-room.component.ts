import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { requestService } from '../../services/request.service';
import { Comments } from '../../classes/comments';
import { UpdateRoomFormComponent } from 'src/app/forms/rooms/update-room-form/update-room-form.component';
import { AddRoomFormComponent } from 'src/app/forms/rooms/add-room-form/add-room-form.component';

@Component({
  selector: 'app-select-room',
  templateUrl: './select-room.component.html',
  styleUrls: ['./select-room.component.css']
})
export class SelectRoomComponent implements OnInit {

  displayedColumns: string[] = ['Room Name', 'Select',];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  roomId: number;
  roomDesc: string;
  roomInfo: any;

  constructor(public matDialogRef: MatDialogRef<SelectRoomComponent>, private _requestService: requestService, public dialog: MatDialog,
    private snackBar: MatSnackBar) {
    matDialogRef.beforeClose().subscribe(() => matDialogRef.close(this.roomInfo));
  }

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

  selectRoom(room_id,room_desc) {
    this.roomInfo = {
      "room_id": room_id,
      "room_desc": room_desc
    }

    // this.roomId = room_id;
    // this.roomDesc = room_desc;
    this.matDialogRef.close();
  }

  FetchData() {
    this._requestService.getRooms()
      .subscribe
      (
        data => {
          this.dataSource.data = data.data;
        }
      )
  }

}
