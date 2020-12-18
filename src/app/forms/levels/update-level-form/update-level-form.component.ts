import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-level-form',
  templateUrl: './update-level-form.component.html',
  styleUrls: ['./update-level-form.component.sass']
})
export class UpdateLevelFormComponent implements OnInit {

 
  @ViewChild('myform', { static: true })
  form: NgForm

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _requestService: requestService,
  private fb : FormBuilder,public dialogRef: MatDialogRef<UpdateLevelFormComponent>,private snackBar: MatSnackBar) {}


  ngOnInit() {
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.form.controls['level_desc'].setValue(this.data.element.level_desc);
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
