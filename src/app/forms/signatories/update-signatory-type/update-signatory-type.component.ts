import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-signatory-type',
  templateUrl: './update-signatory-type.component.html',
  styleUrls: ['./update-signatory-type.component.sass']
})
export class UpdateSignatoryTypeComponent implements OnInit {

  @ViewChild('myform', { static: true })
  form: NgForm

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _requestService: requestService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<UpdateSignatoryTypeComponent>, private snackBar: MatSnackBar) { }


  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.form.controls['sig_pos_desc'].setValue(this.data.element.sig_pos_desc);
    })
  }

  update(form: NgForm) {
    var data =
    {
      "sig_pos_id": this.data.element.sig_pos_id,
      "sig_pos_desc": form.value.sig_pos_desc
    };

    this._requestService.updateSignatoryType(data)
      .subscribe
      (
        success => {
            this.dialogRef.close();
          this.snackBar.open('Saved');
        }
      )
  }

}
