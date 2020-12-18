import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { requestService } from 'src/app/services/request.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';

export interface Prerequisite {
  description: any;
  subject_id: any;
}

@Component({
  selector: 'app-update-curriculum-subject',
  templateUrl: './update-curriculum-subject.component.html',
  styleUrls: ['./update-curriculum-subject.component.css']
})



export class UpdateCurriculumSubjectComponent implements OnInit {

  @ViewChild('myform', { static: true })
  form: NgForm

  subjects = [];
  levels = [];
  semesters = [];
  selectedSubjectDesc: string; // For display purposes
  selectedPrerequisite: string; // For display purposes
  currentSelection: string;
  
  isShow = true;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  displayedColumns: string[] = ['course_number', 'descriptive_title', 'update'];
  dataSource = new MatTableDataSource();

  //Form Data
  curr_subject_prereq: number;
  curr_id: number;
  curr_sub_id: number;
  subject_info: any;
  selected_subject :any ;
  prereq: Prerequisite[];
  selectedSubjectId:any ;

  //prerequisites
  prereq_array = [];
  selected_prereq_array = [];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private _requestService: requestService, public dialog: MatDialog,
    private snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<UpdateCurriculumSubjectComponent>) { }


  ngOnInit() {
    this.curr_sub_id = this.data.curr_sub_id;
    this.fetchSubjectInfo();
    this.fetchSubjects();
    this.fetchLevels();
    this.fetchSemesters();
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

  fetchSubjectInfo(){
    //getCurriculumSubject
    this._requestService.getCurriculumSubject(this.curr_sub_id)
    .subscribe
    (
      data => {
        this.subject_info = data.data[0];
        this.selected_subject = this.subject_info.curr_subject; // Currently selected subject

        //Populate form
        this.form.controls['level_id'].setValue(this.subject_info.curr_level);
        this.form.controls['semester_id'].setValue(this.subject_info.curr_semester);
        this.form.controls['units'].setValue(this.subject_info.units);
        this.form.controls['lec_units'].setValue(this.subject_info.curr_lec_units);
        this.form.controls['lab_units'].setValue(this.subject_info.curr_lab_units);
        this.selectedSubjectDesc = this.subject_info.curr_subject_desc;
        this.curr_id = this.subject_info.curr_id;
        this.selectedSubjectId = this.subject_info.curr_subject;

        var prereqCount = this.subject_info.prerequisites.length;
        for(var i = 0; i < prereqCount; i++ ){
          
          var prereqInfo = {
            'description': this.subject_info.prerequisites[i].subject_desc,
            'subject_id': this.subject_info.prerequisites[i].subject_id,
            'curr_prereq_id': this.subject_info.prerequisites[i].curr_prereq_id
          }
          

          //Storing into array and badges...
          this.prereq_array.push(prereqInfo);
        }

      }
    )
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


  toggleDisplay(selectionType: string) {
    this.isShow = !this.isShow;

    this.currentSelection = selectionType;
  }

  getCurrentSelection() {
    return this.currentSelection;
  }

  selectItem(selectedItem: string,item_id: number) {
    if (this.currentSelection == "Subject") {
      this.selectedSubjectDesc = selectedItem;
      this.selectedSubjectId = item_id;

      //Update current subject here

    } 
    else {

      var prereqInfo = {
        'description': selectedItem,
        'subject_id': item_id
      }

      //Storing into array and badges...
      this.prereq_array.push(prereqInfo);
      
      var newPrereq = {
        'curr_sub_id': this.curr_sub_id,
        'prereq_array': [item_id]   //this is a little different, we immediately add an item not an array
      }

      this._requestService.newPrereq(newPrereq)
      .subscribe
      (
        response => {
          console.log("Prerequisites added!");
        }
      )
    }

    this.isShow = !this.isShow;
  }

  removePrereq(prereq) {
    this._requestService.deletePrerequisite(prereq.curr_prereq_id)
    .subscribe
    (
      data => {
        const index = this.prereq_array.indexOf(prereq);

        if (index >= 0) {
          this.prereq_array.splice(index, 1);
        }
      }
    )
  }


  updateSubject(form : NgForm){
    var data = 
    {
        "curr_sub_id": this.curr_sub_id,
        "curr_id": this.curr_id,
        "curr_subject": this.selectedSubjectId,
        "curr_subject_prereq": null,  //Depricated *changed to store in a seperate table from an array.
        "curr_level": form.value.level_id,
        "curr_semester": form.value.semester_id,
        "curr_subject_units": form.value.units,
        "lab_units": form.value.lab_units,
        "lec_units": form.value.lec_units,
    };

    console.log(data);

    this._requestService.updateCurriculumSubject(data)
    .subscribe
    (
      response => {
        this.dialogRef.close();
      }
    )
  }
}
