import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { requestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-edit-student-grades',
  templateUrl: './edit-student-grades.component.html',
  styleUrls: ['./edit-student-grades.component.css']
})
export class EditStudentGradesComponent implements OnInit {

  @ViewChild('myform', { static: true })
  form: NgForm

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _requestService: requestService,
  private fb : FormBuilder,public dialogRef: MatDialogRef<EditStudentGradesComponent>,private snackBar: MatSnackBar) {}


  ngOnInit() {
  }

  ngAfterViewInit(){
    console.log(this.data.element.grade_details);
    setTimeout(() => {
      this.form.controls['grades'].setValue(this.data.element.grade_details);
    })
  }

  update(form : NgForm) {
    var remarks: any;
    if(form.value.grades == ""){
      remarks = "NIL";
    }else{
      remarks = form.value.grades;
    }
    var data = 
    {
        "enrolled_subjects_id": this.data.element.enrolled_subjects_id,
        "remarks": remarks,
        "grade_id": this.data.element.grade_id
    };

    if(this.data.element.grade_id == ""){
      this._requestService.addGrades(data)
      .subscribe
      (
        success => {
          console.log("Grade Added"),
          this.dialogRef.close();
          this.openSnackBar("Saved");
        }
      )
    }else{
      this._requestService.updateGrades(data)
      .subscribe
      (
        success => {
          console.log("Grade Updated"),
          this.dialogRef.close();
          this.openSnackBar("Saved");
        }
      )
    }
    
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
