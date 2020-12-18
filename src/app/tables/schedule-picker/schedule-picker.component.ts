import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { requestService } from '../../services/request.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormGroupDirective, FormControl, FormArray } from '@angular/forms';


export interface data {
  isActive: boolean;
}


@Component({
  selector: 'app-schedule-picker',
  templateUrl: './schedule-picker.component.html',
  styleUrls: ['./schedule-picker.component.css']
})
export class SchedulePickerComponent implements OnInit {

  displayedColumns: string[] = ['Subject', 'Faculty', 'Semester', 'Level', 'checked'];
  dataSource = new MatTableDataSource();
  initialSelection: string[] = [];
  allowMultiSelect: boolean = true;
  selection = new SelectionModel<string>(this.allowMultiSelect, this.initialSelection);
  docsOnThisPage: any[] = [];
  from: number;
  pageSize: number;

  newOffersForm: FormGroup; //Formulaire
  @ViewChild('formDirective', { static: false }) formDirective: FormGroupDirective; //Erreur formulaire
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Input() address: FormGroup;

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

  onChange(id:string, event) {
    console.log(event);
    const scheduleArray = <FormArray>this.address.controls.checkBox;

    if(event.checked) {
      scheduleArray.push(new FormControl(id));
    } else {
      let index = scheduleArray.controls.findIndex(x => x.value == id);
      scheduleArray.removeAt(index);
    }
  }

  public CheckPreRequisites(){
      //Logic to check if this subject can be enrolled
  }
}
