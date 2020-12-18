import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { requestService } from '../../services/request.service';
import { NewFeeCategoryComponent } from 'src/app/forms/fees/new-fee-category/new-fee-category.component';
import { NewCourseFeeComponent } from 'src/app/forms/fees/new-course-fee/new-course-fee.component';
import { NewFeeTypesComponent } from 'src/app/forms/fees/new-fee-types/new-fee-types.component';
import { UpdateFeeCategoryComponent } from 'src/app/forms/fees/update-fee-category/update-fee-category.component';
import { UpdateFeeTypesComponent } from 'src/app/forms/fees/update-fee-types/update-fee-types.component';
import { UpdateCourseFeeComponent } from 'src/app/forms/fees/update-course-fee/update-course-fee.component';
import { ManageFeeTypesComponent } from 'src/app/dialogs/manage-fee-types/manage-fee-types.component';
import { ManageFeeCategoriesComponent } from 'src/app/dialogs/manage-fee-categories/manage-fee-categories.component';
import { SignatoryTypesComponent } from 'src/app/pages/signatory-types/signatory-types.component';
import { NewSignatoryComponent } from 'src/app/forms/signatories/new-signatory/new-signatory.component';
import { UpdateSignatoryComponent } from 'src/app/forms/signatories/update-signatory/update-signatory.component';

@Component({
  selector: 'app-signatories',
  templateUrl: './signatories.component.html',
  styleUrls: ['./signatories.component.css']
})
export class SignatoriesComponent implements OnInit {

 
  signatoriesColumns: string[] = ['signatory_person', 'sig_pos_desc','Update', 'Delete'];
  signatoriesData = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;



  constructor(private _requestService: requestService, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.FetchData();
  }

  ngAfterViewInit() {
    this.signatoriesData.sort = this.sort;
    this.signatoriesData.paginator = this.paginator;
  }

  filterCourseFees(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches

    this.signatoriesData.filter = filterValue;
  }

  newSignatory() {
    this.dialog.open(NewSignatoryComponent).afterClosed()
      .subscribe(result => {
        this.FetchData();
      });;
  }

  updateSignatory(element) {
    this.dialog.open(UpdateSignatoryComponent, {
      data: {
        element
      }
    }).afterClosed().subscribe(result => {
      this.FetchData();
    });
  }

  DeleteSignatory(id) {
    this._requestService.deleteSignatory(id)
      .subscribe
      (
        data => {
          if (data == "success") this.FetchData();
          else alert("Failed to delete");
        }
      )
  }

  FetchData() {
    this._requestService.getSignatories()
      .subscribe
      (
        data => {
          this.signatoriesData.data = data.data;
          console.log(data.data);
        }
      )
  }


  ManageTypes() {
    this.dialog.open(SignatoryTypesComponent, {
    }).afterClosed().subscribe(result => {
      this.FetchData();
    });
  }

}
