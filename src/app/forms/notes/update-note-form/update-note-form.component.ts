import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-note-form',
  templateUrl: './update-note-form.component.html',
  styleUrls: ['./update-note-form.component.css']
})
export class UpdateNoteFormComponent implements OnInit {

  @ViewChild('myform', { static: true })
  form: NgForm

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _requestService: requestService,
  private fb : FormBuilder,public dialogRef: MatDialogRef<UpdateNoteFormComponent>,private snackBar: MatSnackBar) {}

  ngOnInit() {
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.form.controls['note_title'].setValue(this.data.element.note_title);
      this.form.controls['note_message'].setValue(this.data.element.note_message);
    })
  }

  update(form : NgForm) {
    var data = 
    {
        "note_id": this.data.element.note_id,
        "note_message": form.value.note_message,
        "note_title":form.value.note_title,
    };

     this._requestService.updateNote(data)
    .subscribe
    (
      success => {
        console.log("Note Updated"),
        this.dialogRef.close();
      }
    )
  }
}
