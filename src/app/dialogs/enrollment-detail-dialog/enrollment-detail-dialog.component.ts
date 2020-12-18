import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-enrollment-detail-dialog',
  templateUrl: './enrollment-detail-dialog.component.html',
  styleUrls: ['./enrollment-detail-dialog.component.css']
})
export class EnrollmentDetailDialogComponent implements OnInit {

  enrollment: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.enrollment = this.data.element;
    console.log(this.data);
  }

}
