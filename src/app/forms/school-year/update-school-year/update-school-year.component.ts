import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';


export interface Year {
  sy_start: string;
}

@Component({
  selector: 'app-update-school-year',
  templateUrl: './update-school-year.component.html',
  styleUrls: ['./update-school-year.component.sass']
})
export class UpdateSchoolYearComponent implements OnInit {

  years: Year[] = [
    {sy_start: '2018'},
    {sy_start: '2019'},
    {sy_start: '2021'},
    {sy_start: '2022'},
    {sy_start: '2023'},
    {sy_start: '2024'},
    {sy_start: '2025'},
    {sy_start: '2026'},
    {sy_start: '2027'},
    {sy_start: '2028'},
    {sy_start: '2029'},
    {sy_start: '2030'},
    {sy_start: '2031'},
    {sy_start: '2032'},
    {sy_start: '2033'},
    {sy_start: '2034'},
  ];

  public start: string;

  @ViewChild('myform', { static: true })
  form: NgForm

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _requestService: requestService,
  private fb : FormBuilder,public dialogRef: MatDialogRef<UpdateSchoolYearComponent>,private snackBar: MatSnackBar) {}


  ngOnInit() {
  }

  ngAfterViewInit(){
    setTimeout(() => {
      
      this.start = this.data.element.sy_start;
      this.form.controls['sy_start'].setValue(this.start);
      console.log(this.start);
      // this.form.controls['sy_end'].setValue(this.data.element.sy_end);
    })
  }

  update(form : NgForm) {
    var data = 
    {
        "level_id": this.data.element.level_id,
        "level_desc": form.value.level_desc
    };

     this._requestService.updateLevel(data)
    .subscribe
    (
      success => {
        console.log("Level Updated"),
        this.dialogRef.close();
      }
    )
  }

}
