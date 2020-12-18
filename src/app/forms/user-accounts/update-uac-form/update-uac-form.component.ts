import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-uac-form',
  templateUrl: './update-uac-form.component.html',
  styleUrls: ['./update-uac-form.component.css']
})
export class UpdateUacFormComponent implements OnInit {

  @ViewChild('myform', { static: true })
  form: NgForm
  AccountTypes = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _requestService: requestService,
  private fb : FormBuilder,public dialogRef: MatDialogRef<UpdateUacFormComponent>,private snackBar: MatSnackBar) {}


  ngOnInit() {
    
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.fetchAccountTypes();
      console.log(this.data.element);
      this.form.controls['uac_name'].setValue(this.data.element.uac_name);
      this.form.controls['uac_fullname'].setValue(this.data.element.uac_fullname);
      this.form.controls['uac_pword'].setValue(this.data.element.uac_pword);
      this.form.controls['uac_type_id'].setValue(this.data.element.uac_type_id);
    })
  }

  update(form : NgForm) {
    var data = 
    {
        "uac_id": this.data.element.uac_id,
        "uac_name": form.value.uac_name,
        "uac_fullname": form.value.uac_fullname,
        "uac_pword": form.value.uac_pword,
        "uac_type": form.value.uac_type_id
    };

     this._requestService.updateUserAccount(data)
    .subscribe
    (
      success => {
        console.log("Account Updated"),
        this.dialogRef.close();
      }
    )
  }

  fetchAccountTypes(){
    this._requestService.getUserTypes()
    .subscribe
    (
      data => {
       this.AccountTypes = data.data;
      }
    )
  }
}
