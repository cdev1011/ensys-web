import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort,MatDialog, MAT_DIALOG_DATA,MatSnackBar, MatDialogRef } from '@angular/material';
import { requestService } from '../../services/request.service';
import { UpdateScheduleFormComponent } from '../../forms/schedules/update-schedule-form/update-schedule-form.component';
import { Comments } from '../../classes/comments';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddScheduleFormComponent } from 'src/app/forms/schedules/add-schedule-form/add-schedule-form.component';

export interface Year {
  value: string;
}

export interface Year {
  value: string;
}
@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {


  years: Year[] = [
    {value: '2018'},
    {value: '2019'},
    {value: '2020'},
    {value: '2021'},
    {value: '2022'},
    {value: '2023'},
    {value: '2024'},
    {value: '2025'},
    {value: '2026'},
    {value: '2027'},
    {value: '2028'},
    {value: '2029'},
    {value: '2030'},
    {value: '2031'},
    {value: '2032'},
    {value: '2033'},
    {value: '2034'},
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  ScheduleColumns: string[] = ['course_title','school_year','curriculum','View','Update','Delete'];
  scheduleData = new MatTableDataSource();
    
  constructor(private _requestService: requestService,public dialog: MatDialog,
    private snackBar: MatSnackBar,private _formBuilder: FormBuilder,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.FetchScheduleList();
  }

  ngAfterViewInit() {
    this.scheduleData.paginator = this.paginator;
    this.scheduleData.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.scheduleData.filter = filterValue;
  }

  newRecord() {
    this.dialog.open(AddScheduleFormComponent).afterClosed()
    .subscribe(result => {
      this.FetchScheduleList();
    });
  }

  UpdateItem(element) {
    this.dialog.open(UpdateScheduleFormComponent, {
      data: {
        element
      }
    }).afterClosed().subscribe(result => {
      this.FetchScheduleList();
    });
  }

  FetchScheduleList(){
    this._requestService.getSchedules()
    .subscribe
    (
      data => {
        this.scheduleData.data = data.data;
      }
    )
  }

  ShowCurriculum(id){
    this.router.navigate(['/schedule-list'], { queryParams: { scheduleId: id} });
  }

  DeleteSchedule(id){
    this._requestService.deleteSchedule(id)
    .subscribe
    (
      data => {
        if(data == "success") this.FetchScheduleList();
        else alert("Failed to delete");
      }
    )
  }

}
