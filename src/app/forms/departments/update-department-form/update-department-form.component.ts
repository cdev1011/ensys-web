import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-department-form',
  templateUrl: './update-department-form.component.html',
  styleUrls: ['./update-department-form.component.sass']
})
export class UpdateDepartmentFormComponent implements OnInit {

  @ViewChild('myform', { static: true })
  form: NgForm

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _requestService: requestService,
  private fb : FormBuilder,public dialogRef: MatDialogRef<UpdateDepartmentFormComponent>,private snackBar: MatSnackBar) {}


  ngOnInit() {
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.form.controls['department_desc'].setValue(this.data.element.department_desc);
    })
  }

  update(form : NgForm) {
    var data = 
    {
        "department_id": this.data.element.department_id,
        "department_desc": form.value.department_desc
    };

     this._requestService.updateDepartment(data)
    .subscribe
    (
      success => {
        console.log("Department Updated"),
        this.dialogRef.close();
        this.snackBar.open('Saved');
      }
    )
  }
}
