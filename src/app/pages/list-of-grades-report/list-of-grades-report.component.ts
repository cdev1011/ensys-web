import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { requestService } from 'src/app/services/request.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-list-of-grades-report',
  templateUrl: './list-of-grades-report.component.html',
  styleUrls: ['./list-of-grades-report.component.css']
})

export class ListOfGradesReportComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _requestService: requestService, public dialog: MatDialog, private router: Router,) { }

  ReportsSummary = [];
  course: any;
  semester: any;
  schoolYear: any;
  GradeList: any;
  CourseDesc: any;
  CourseCode: any;
  SchoolYearDesc: any;
  SemesterDesc: any;

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.course = params['course_id'];
      this.semester = params['semester_id'];
      this.schoolYear = params['school_year'];
      this.CourseDesc = params['course_full_desc'];
      this.CourseCode = params['course_code'];
      this.SchoolYearDesc = params['school_year_desc'];
      this.SemesterDesc = params['semester'];
      console.log(this.course + "    " + this.semester + "   " + this.schoolYear);

    });

    var filter =
    {
      "course_id": this.course,
      "sy_id": this.semester,
      "semester_id": this.schoolYear
    };

    this.GradeList = this._requestService.getListOfGrades(filter)
      .subscribe
      (
        data => {
          this.GradeList = data;


          var LevelGrade = [];

          for (let key in this.GradeList) {

            //Captures the levels
            let data = this.GradeList[key];
            let studentsSubjectGradeList = [];

            //get the list of students for this level's grades
            for (let studentLvlRecord in data.student_grades) {
              let StudentListRecords = data.student_grades[studentLvlRecord];

              let StudentName = "";
              //Create Record for this student
              for (let StudentRecord in StudentListRecords) {
                let Student = StudentListRecords[StudentRecord];
                StudentName = Student.student_fname;
                studentsSubjectGradeList.push(Student);
              }

              //Create Record
              let StudentLevelGrades = {
                student_id: studentLvlRecord,
                student_name: StudentName,
                student_grades: studentsSubjectGradeList
              }

              LevelGrade.push(StudentLevelGrades);
              studentsSubjectGradeList = [];
            }

            //Finalize report fot this level
            let LevelReport = {
              level: data.level,
              students: LevelGrade
            };

            //Push this in the initial reports array
            this.ReportsSummary.push(LevelReport);

            LevelGrade = [];
          }

          // this.ReportsSummary.forEach(element => {
          //   console.log("Level: " + element.level);
          //   element.students.forEach(student => {
          //     console.log("Student ID: " + student.student_id + "Student Name: " + student.student_name);
          //     student.student_grades.forEach(StudentGrade => {
          //       console.log("Student Name: " + StudentGrade.student_fname + "; Final Grade:" + StudentGrade.final_grade);
          //     });
          //   });
          // });
        }
      )
  }

  GetYearAndSemDesc(){
    return this.SemesterDesc + " S.Y. " + this.SchoolYearDesc 
  }

  GetCourseDesc(){
    return this.CourseDesc;
  }

  GetCourseCode(){
    return this.CourseCode;
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    var htmlToPrint = '' +
    '<style type="text/css">' +
    'table th, table td {' +
    'border:1px solid #000;' +
    'padding:0.5em;' +
    '}' +
    '</style>';
    
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write('<html><head>  <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,500" rel="stylesheet"> '+
   ' <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">' + 
    '<link rel="icon" type="image/x-icon" href="favicon.ico">'+
    '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">' +
    '<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>' + 
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>'+
    '<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>' +
    ' <style type="text/css">.profile-img-holder{height:120px; width: 120px; background-size: cover; } ' +
    ' .active-profile label{ color: #34495e; } ' +
    ' .profile-img-holder img{ height:100%; width: 100%; }' +
    ' table, th, td { border: 1px solid black; }' +
    '  th{   text-align: center;} body{ padding:10; }' +
    ' </style> </head><body  onload="window.print()">' + printContents + '</html>');

    popupWin.document.close();
}

@ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
  title = 'Excel';  
  ExportTOExcel() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
   
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');  
  }  
}
