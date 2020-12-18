import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-update-fee-category',
  templateUrl: './update-fee-category.component.html',
  styleUrls: ['./update-fee-category.component.sass']
})
export class UpdateFeeCategoryComponent implements OnInit {

  @ViewChild('myform', { static: true })
  form: NgForm

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _requestService: requestService,
  private fb : FormBuilder,public dialogRef: MatDialogRef<UpdateFeeCategoryComponent>,private snackBar: MatSnackBar) {}


  ngOnInit() {
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.form.controls['fee_category_desc'].setValue(this.data.element.fee_category_desc);
    })
  }

  update(form : NgForm) {
    var data = 
    {
        "fee_category_id": this.data.element.fee_category_id,
        "fee_category_desc": form.value.fee_category_desc
    };

     this._requestService.updateFeeCategory(data)
    .subscribe
    (
      success => {
        console.log("Category Updated"),
        this.dialogRef.close();
        this.snackBar.open('Saved');
      }
    )
  }
}
