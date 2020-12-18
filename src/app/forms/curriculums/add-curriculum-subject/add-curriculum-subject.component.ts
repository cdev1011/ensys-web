import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { requestService } from 'src/app/services/request.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-curriculum-subject',
  templateUrl: './add-curriculum-subject.component.html',
  styleUrls: ['./add-curriculum-subject.component.css']
})
export class AddCurriculumSubjectComponent implements OnInit {

  subjects = [];
  levels = [];
  semesters = [];
  selectedSubject: string; // For display purposes
  selectedPrerequisite: string; // For display purposes
  currentSelection: string;

  displayedColumns: string[] = ['course_number', 'descriptive_title', 'update'];
  dataSource = new MatTableDataSource();

  //Form Data
  curr_subject: number;
  curr_subject_prereq: number;
  curr_id: number;
  

  //prerequisites
  prereq_array = [];
  selected_prereq_array = [];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild('myform', { static: true })
  form: NgForm

  constructor(private _requestService: requestService, public dialog: MatDialog,
    private snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<AddCurriculumSubjectComponent>) { }


  ngOnInit() {
    this.fetchSubjects();
    this.fetchLevels();
    this.fetchSemesters();
    this.curr_id = this.data.curr_id;
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

  fetchSubjects() {
    this._requestService.getSubjects()
      .subscribe
      (
        data => {
          this.dataSource.data = data.data;
        }
      )
  }

  fetchLevels() {
    this._requestService.getLevels()
      .subscribe
      (
        data => {
          this.levels = data.data;
        }
      )
  }

  fetchSemesters() {
    this._requestService.getSemesters()
      .subscribe
      (
        data => {
          this.semesters = data.data;
        }
      )
  }

  isShow = true;

  toggleDisplay(selectionType: string) {
    this.isShow = !this.isShow;

    this.currentSelection = selectionType;
  }

  getCurrentSelection() {
    return this.currentSelection;
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  selectItem(selectedItem: string,item_id: number) {
    if (this.currentSelection == "Subject") {
      this.selectedSubject = selectedItem;
      this.curr_subject = item_id;
    } else {

      this.prereq_array.push(item_id);
      this.selected_prereq_array.push(selectedItem);
      console.log("New Prerequisites Array: " + this.prereq_array); //Print out prerequisites

      this.selectedPrerequisite = selectedItem;
      this.curr_subject_prereq = item_id;
    }

    this.isShow = !this.isShow;
  }

  removePrereq(prereq) {
    console.log("removing " + prereq);
    const index = this.selected_prereq_array.indexOf(prereq);

    if (index >= 0) {
      this.selected_prereq_array.splice(index, 1);
      this.prereq_array.splice(index, 1);

      console.log("New Prerequisites Array: " + this.prereq_array); //Print out prerequisites
    }
  }

  addNewSubject(form : NgForm) {

    console.log(this.curr_id);
    var data = 
    {
        "curr_id": this.curr_id,
        "curr_subject": this.curr_subject,
        "curr_subject_prereq": null, //Depricated *changed to store in a seperate table from an array.
        "curr_level": form.value.level_id,
        "curr_semester": form.value.semester_id,
        "curr_subject_units": form.value.units,
        "curr_prereq_array": this.prereq_array,
        "lab_units": form.value.lab_units,
        "lec_units": form.value.lec_units
    };

    this._requestService.newCurriculumSubject(data)
    .subscribe
    (
      response => {
        var curr_sub_id = response;
        console.log(curr_sub_id);
        
        var data = 
        {
            "curr_sub_id": curr_sub_id,
            "prereq_array": this.prereq_array
        };

        if(this.prereq_array.length > 0){
          this.UpdatePrerequisites(data);
        }

        this.dialogRef.close();
      }
    )
  }

  UpdatePrerequisites(subjects){
    this._requestService.newPrereq(subjects)
    .subscribe
    (
      response => {
        console.log("Prerequisites added!");
      }
    )
  }

}
