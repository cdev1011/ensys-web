import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { requestService } from 'src/app/services/request.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

export interface Year {
  value: string;
}

@Component({
  selector: 'app-add-school-year',
  templateUrl: './add-school-year.component.html',
  styleUrls: ['./add-school-year.component.sass']
})
export class AddSchoolYearComponent implements OnInit {

  years: Year[] = [
    {value: '2018'},
    {value: '2019'},
    {value: '2020'},
    {value: '2021'},
    {value: '2022'},
    {value: '2023'},
    {value: '2024'},
    {value: '2025'},
    {value: '2026'},
    {value: '2027'},
    {value: '2028'},
    {value: '2029'},
    {value: '2030'},
    {value: '2031'},
    {value: '2032'},
    {value: '2033'},
    {value: '2034'},
  ];


  constructor(private _requestService: requestService, public datepipe: DatePipe,
    public dialogRef: MatDialogRef<AddSchoolYearComponent>) {}

  ngOnInit() {
  }

  newSchoolYear(form : NgForm) {
    this._requestService.newSchoolYear(form.value)
    .subscribe
    (
      success => {
        this.dialogRef.close();
      }
    )
  }
}
