import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-section-form',
  templateUrl: './update-section-form.component.html',
  styleUrls: ['./update-section-form.component.sass']
})
export class UpdateSectionFormComponent implements OnInit {

  @ViewChild('myform', { static: true })
  form: NgForm

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _requestService: requestService,
  private fb : FormBuilder,public dialogRef: MatDialogRef<UpdateSectionFormComponent>,private snackBar: MatSnackBar) {}


  ngOnInit() {
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.form.controls['section_desc'].setValue(this.data.element.section_desc);
    })
  }

  update(form : NgForm) {
    var data = 
    {
        "section_id": this.data.element.section_id,
        "section_desc": form.value.section_desc
    };

     this._requestService.updateSection(data)
    .subscribe
    (
      success => {
        console.log("Section Updated"),
        this.dialogRef.close();
      }
    )
  }

}
