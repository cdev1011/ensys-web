import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { requestService } from '../../services/request.service';
import { AddLevelFormComponent } from 'src/app/forms/levels/add-level-form/add-level-form.component';
import { UpdateScheduleFormComponent } from 'src/app/forms/schedules/update-schedule-form/update-schedule-form.component';


@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.css']
})
export class ScheduleViewComponent implements OnInit {

  displayedColumns: string[] = ['Subject', 'Faculty', 'Semester', 'Level', 'Update', 'Delete'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private _requestService: requestService, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fetchData();
  }

  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    console.log(filterValue);
    this.dataSource.filter = filterValue;
  }

  newRecord() {
  }

  UpdateItem(element) {
    this.dialog.open(UpdateScheduleFormComponent, {
      data: {
        element
      }
    }).afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  DeleteSchedule(id) {
    this._requestService.deleteSchedule(id)
    .subscribe
    (
      data => {
        this.fetchData();
        console.log("Deleted Schedule");
      }
    )
  }

  fetchData() {
    this._requestService.getSchedules()
      .subscribe
      (
        data => {
          console.log(data.data);
          this.dataSource.data = data.data;
        }
      )
  }

}
