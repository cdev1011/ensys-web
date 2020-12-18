import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-fee-types',
  templateUrl: './update-fee-types.component.html',
  styleUrls: ['./update-fee-types.component.sass']
})
export class UpdateFeeTypesComponent implements OnInit {

  categories = [];

  @ViewChild('myform', { static: true })
  form: NgForm

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _requestService: requestService,
  private fb : FormBuilder,public dialogRef: MatDialogRef<UpdateFeeTypesComponent>,private snackBar: MatSnackBar) {}

  ngOnInit() {
  }

  ngAfterViewInit(){
    setTimeout(() => {
      console.log(this.data);
      this.fetchCategories();
      this.form.controls['fee_type_desc'].setValue(this.data.element.fee_type_desc);
      this.form.controls['fee_category_id'].setValue(this.data.element.fee_category_id);
    })
  }

  update(form : NgForm) {
    var data = 
    {
        "fee_type_id": this.data.element.fee_type_id,
        "fee_type_desc": form.value.fee_type_desc,
        "fee_category_id" : form.value.fee_category_id
    };

     this._requestService.updateFeeType(data)
    .subscribe
    (
      success => {
        console.log("Type Updated"),
        this.dialogRef.close();
      }
    )
  }

  fetchCategories(){
    this._requestService.getFeeCategory()
    .subscribe
    (
      data => {
       this.categories = data.data;
      }
    )
  }
}
