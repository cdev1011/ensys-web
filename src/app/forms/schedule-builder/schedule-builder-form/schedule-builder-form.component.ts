import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { requestService } from 'src/app/services/request.service';
import { MatSnackBar } from '@angular/material';


export interface Semester {
  semester_id: number;
  semester_desc: string;
}

export interface Subject {
  subject_id: number;
  subject_desc: string;
}

export interface Level {
  level_id: number;
  level_desc: string;
}

export interface Faculty {
  faculty_id: number;
  faculty_fname: string;
}

@Component({
  selector: 'app-schedule-builder-form',
  templateUrl: './schedule-builder-form.component.html',
  styleUrls: ['./schedule-builder-form.component.css']
})
export class ScheduleBuilderFormComponent implements OnInit {

  myControl = new FormControl();
  subjectData = new FormControl();
  lvlData = new FormControl();
  facultyData = new FormControl();
  semester: Semester[];
  subjects: Subject[];
  levels: Level[];
  faculty: Faculty[];

  scheduleForm = new FormGroup({
    semester: this.myControl,
    subjects: this.subjectData,
    levels: this.lvlData,
    faculty: this.facultyData
    });

  filteredOptions: Observable<Semester[]>;
  filteredSubjects: Observable<Subject[]>;
  filteredLevels: Observable<Level[]>;
  filteredFaculty: Observable<Faculty[]>;

  constructor(private _requestService: requestService, private snackBar: MatSnackBar) { 
  }

  ngOnInit() {
    this.FetchData();
  }

  displayFn(semester?: Semester): string | undefined {
    return semester ? semester.semester_desc : undefined;
  }

  displaySbj(subjects?: Subject): string | undefined {
    return subjects ? subjects.subject_desc : undefined;
  }

  displayLvl(levels?: Level): string | undefined {
    return levels ? levels.level_desc : undefined;
  }

  displayFaculty(faculty?: Faculty): string | undefined {
    return faculty ? faculty.faculty_fname : undefined;
  }

  private _filter(name: string): Semester[] {
    const filterValue = name.toLowerCase();

    return this.semester.filter(semester => semester.semester_desc.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterSubject(name: string): Subject[] {
    const filterValue = name.toLowerCase();
    return this.subjects.filter(subjects => subjects.subject_desc.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterLevels(name: string): Level[] {
    const filterValue = name.toLowerCase();
    return this.levels.filter(levels => levels.level_desc.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterFaculty(name: string): Faculty[] {
    const filterValue = name.toLowerCase();
    
    return this.faculty.filter(faculty => faculty.faculty_fname.toLowerCase().indexOf(filterValue) === 0);
  }


  FetchData() {
    this._requestService.getSemesters()
      .subscribe
      (
        data => {
          this.semester = data.data;
          this.filterSemester();
        }
      )

      this._requestService.getSubjects()
      .subscribe
      (
        subjects => {
          this.subjects = subjects.data;
          this.filterSubjects();
        }
      )

      this._requestService.getLevels()
      .subscribe
      (
        levels => {
          this.levels = levels.data;
          this.filterLevels();
        }
      )

       this._requestService.getFaculty()
      .subscribe
      (
        faculty => {
          this.faculty = faculty.data;
          console.log(this.faculty);
          this.filterFaculty();
        }
      )
  }

  filterSemester(){
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith<string | Semester>(''),
      map(value => typeof value === 'string' ? value : value.semester_desc),
      map(name => name ? this._filter(name) : this.semester.slice())
    );
  }

  filterFaculty(){
    this.filteredFaculty = this.facultyData.valueChanges
    .pipe(
      startWith<string | Faculty>(''),
      map(value => typeof value === 'string' ? value : value.faculty_fname),
      map(name => name ? this._filterFaculty(name) : this.faculty.slice())
    );
  }
  
  filterLevels(){
    this.filteredLevels = this.lvlData.valueChanges
    .pipe(
      startWith<string | Level>(''),
      map(value => typeof value === 'string' ? value : value.level_desc),
      map(name => name ? this._filterLevels(name) : this.levels.slice())
    );
  }

  filterSubjects(){
    this.filteredSubjects = this.subjectData.valueChanges
    .pipe(
      startWith<string | Subject>(''),
      map(value => typeof value === 'string' ? value : value.subject_desc),
      map(name => name ? this._filterSubject(name) : this.subjects.slice())
    );
  }
  

  newSchedule() {
    var data = 
    {
        "subject_id": this.scheduleForm.value.subjects.subject_id,
        "faculty_id": this.scheduleForm.value.faculty.faculty_id,
        "level_id": this.scheduleForm.value.levels.level_id,
        "semester_id": this.scheduleForm.value.semester.semester_id
    };

    console.log("Formatted data for API > " + data);

     this._requestService.newSchedule(data)
    .subscribe
    (
      success => {
        this.scheduleForm.reset();
        this.openSnackBar("New Schedule added!");
        console.log("New Schedule inserted")
        
      }
    )
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
