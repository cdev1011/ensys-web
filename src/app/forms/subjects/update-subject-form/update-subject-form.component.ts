import { Component, OnInit ,Inject,Input,ViewChild, Output, EventEmitter} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort,MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { requestService } from '../../../services/request.service';
import { NgForm,FormControl,FormGroup,FormBuilder,AbstractControl, NgModel } from '@angular/forms';

@Component({
  selector: 'app-update-subject-form',
  templateUrl: './update-subject-form.component.html',
  styleUrls: ['./update-subject-form.component.css']
})

export class UpdateSubjectFormComponent implements OnInit {

  @ViewChild('myform', { static: true })
  form: NgForm


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _requestService: requestService,
  private fb : FormBuilder,public dialogRef: MatDialogRef<UpdateSubjectFormComponent>,private snackBar: MatSnackBar) {}

  ngOnInit() {
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.form.controls['subject_course_no'].setValue(this.data.element.subject_course_no);
      this.form.controls['descriptive_title'].setValue(this.data.element.descriptive_title);
    })
  }

  register(form : NgForm) {
    var data = 
    {
        "subject_id": this.data.element.subject_id,
        "subject_course_no": form.value.subject_course_no,
        "descriptive_title": form.value.descriptive_title,
    };
     this._requestService.updateSubject(data)
    .subscribe
    (
      success => {
        console.log("Record Updated"),
        this.dialogRef.close();
      }
    )
    console.log(data);
  }
}
