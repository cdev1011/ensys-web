import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { requestService } from 'src/app/services/request.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { TouchSequence } from 'selenium-webdriver';
import { AddCurriculumSubjectComponent } from '../../forms/curriculums/add-curriculum-subject/add-curriculum-subject.component';
import * as XLSX from 'xlsx';  
import { UpdateCurriculumSubjectComponent } from 'src/app/forms/curriculums/update-curriculum-subject/update-curriculum-subject.component';

@Component({
  selector: 'app-curriculum-view',
  templateUrl: './curriculum-view.component.html',
  styleUrls: ['./curriculum-view.component.css']
})
export class CurriculumViewComponent implements OnInit {

  constructor(private route: ActivatedRoute,private _requestService: requestService,public dialog: MatDialog,private router: Router,) { }

  curr_id: any;
  year: string;
  college: string;
  major: string;
  course: string;

  curriculumColumns: string[] = ['level'];
  curriculumData :any;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.curr_id = params['curriculumId'];
      this.fetchCurriculum();
  });
  }

  objectKeys(obj) {
    return Object.keys(obj);
  }

  fetchCurriculum(){
    this._requestService.getCurriculumView(this.curr_id)
    .subscribe
    (
      data => {
        this.year =  data.curriculum_info.curriculum_year;
        this.college = data.course_info.course_title;
        this.course = data.course_info.course_desc;
        if(data.major != "none") this.major = data.major.major_desc;
        this.curriculumData = data.list; 
        console.log(data);
      }
    )
  }

  isShow = true;

  toggleDisplay(){
    this.isShow = !this.isShow;
  }

  addNewSubject(){
    
    var currId = this.curr_id;
    this.dialog.open(AddCurriculumSubjectComponent, {
      data: {
        "curr_id": currId
      }
    }).afterClosed().subscribe(result => {
      // this.router.navigate(['/curriculum-view'], { queryParams: { curriculumId: this.curr_id} });
      this.ngOnInit();
    });
  }
  

  getYear(){
    return this.year;
  }

  getCollege(){
    return this.college;
  }

  getCourse(){
    return this.course;
  }

  getMajor(){
    if(this.major != null) return "Major in " +  this.major;
    else return null;
   
  }

  DeleteCurriculum(id){
    this._requestService.deleteCurriculumSubject(id)
    .subscribe
    (
      data => {
        this.ngOnInit();
      }
    )
  }

  UpdateCurriculumSubject(curr_sub_id){
    this.dialog.open(UpdateCurriculumSubjectComponent, {
      data: {
        "curr_sub_id": curr_sub_id
      }
    }).afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write('<html><head>  <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,500" rel="stylesheet"> '+
   ' <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">' + 
    '<link rel="icon" type="image/x-icon" href="favicon.ico">'+
    '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">' +
    '<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>' + 
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>'+
    '<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>' +
    ' </head><body  onload="window.print()">' + printContents + '</html>');

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
