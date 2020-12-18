import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort,MatDialog, MAT_DIALOG_DATA,MatSnackBar, MatDialogRef } from '@angular/material';
import { requestService } from '../../services/request.service';
import { AddCurriculumFormComponent } from '../../forms/curriculums/add-curriculum-form/add-curriculum-form.component';
import { UpdateCurriculumFormComponent } from '../../forms/curriculums/update-curriculum-form/update-curriculum-form.component';
import { Comments } from '../../classes/comments';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export interface Year {
  value: string;
}

@Component({
  selector: 'app-curriculums',
  templateUrl: './curriculums.component.html',
  styleUrls: ['./curriculums.component.css']
})

export class CurriculumsComponent implements OnInit {

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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  curriculumColumns: string[] = ['course_full_desc','year','View','Update','Delete'];
  curriculumData = new MatTableDataSource();
    
  constructor(private _requestService: requestService,public dialog: MatDialog,
    private snackBar: MatSnackBar,private _formBuilder: FormBuilder,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.FetchCurriculums();
  }

  ngAfterViewInit() {
    this.curriculumData.paginator = this.paginator;
    this.curriculumData.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.curriculumData.filter = filterValue;
  }

  newRecord() {
    this.dialog.open(AddCurriculumFormComponent).afterClosed()
    .subscribe(result => {
      this.FetchCurriculums();
    });
  }

  UpdateItem(element) {
    this.dialog.open(UpdateCurriculumFormComponent, {
      data: {
        element
      }
    }).afterClosed().subscribe(result => {
      this.FetchCurriculums();
    });
  }

  FetchCurriculums(){
    this._requestService.getCurriculums()
    .subscribe
    (
      data => {
        this.curriculumData.data = data.data;
      }
    )
  }

  ShowCurriculum(id){
    this.router.navigate(['/curriculum-view'], { queryParams: { curriculumId: id} });
  }

  DeleteCurriculum(id){
    this._requestService.deleteCurriculum(id)
    .subscribe
    (
      data => {
        if(data == "success") this.FetchCurriculums();
        else alert("Failed to delete");
      }
    )
  }


}
