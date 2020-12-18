import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-note-form',
  templateUrl: './add-note-form.component.html',
  styleUrls: ['./add-note-form.component.css']
})
export class AddNoteFormComponent implements OnInit {

  constructor(private _requestService: requestService, public datepipe: DatePipe,
    public dialogRef: MatDialogRef<AddNoteFormComponent>) { }

  ngOnInit() {
  }

  newNote(form: NgForm) {
    this._requestService.newNote(form.value)
      .subscribe
      (
        success => {
          this.dialogRef.close();
        }
      )
  }

}
