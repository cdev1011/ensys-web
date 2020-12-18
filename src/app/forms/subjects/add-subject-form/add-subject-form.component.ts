import { Component, OnInit } from '@angular/core';
import { requestService } from '../../../services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm, FormControl } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-subject-form',
  templateUrl: './add-subject-form.component.html',
  styleUrls: ['./add-subject-form.component.css']
})
export class AddSubjectFormComponent implements OnInit {
  
  constructor(private _requestService: requestService, public datepipe: DatePipe,
    public dialogRef: MatDialogRef<AddSubjectFormComponent>, private snackBar: MatSnackBar) {

   }

  ngOnInit() {
  }   

  register(form : NgForm) {
    this._requestService.newSubject(form.value)
    .subscribe
    (
      success => {
        this.openSnackBar("Inserted new record");
        this.dialogRef.close();
      }
    )
  }

    
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
