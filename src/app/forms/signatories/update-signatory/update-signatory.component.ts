import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-signatory',
  templateUrl: './update-signatory.component.html',
  styleUrls: ['./update-signatory.component.css']
})
export class UpdateSignatoryComponent implements OnInit {

  signatoryTypes = [];

  @ViewChild('myform', { static: true })
  form: NgForm

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _requestService: requestService,
  private fb : FormBuilder,public dialogRef: MatDialogRef<UpdateSignatoryComponent>,private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.fetchSignatoryTypes();
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.form.controls['signatory_person'].setValue(this.data.element.signatory_person);
      this.form.controls['sig_pos_id'].setValue(this.data.element.sig_pos_id);
    })
  }

  update(form : NgForm) {
    var data = 
    {
        "signatory_id" : this.data.element.signatory_id,
        "signatory_person": form.value.signatory_person,
        "sig_pos_id": form.value.sig_pos_id
    };
   
     this._requestService.updateSignatory(data)
    .subscribe
    (
      success => {
        this.dialogRef.close();
      }
    )
   }

  fetchSignatoryTypes(){
    this._requestService.getSignatoryTypes()
    .subscribe
    (
      data => {
       this.signatoryTypes = data.data;
      }
    )
  }
}
