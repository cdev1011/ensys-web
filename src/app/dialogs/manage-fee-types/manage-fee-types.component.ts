import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { requestService } from '../../services/request.service';
import { NewFeeCategoryComponent } from 'src/app/forms/fees/new-fee-category/new-fee-category.component';
import { NewCourseFeeComponent } from 'src/app/forms/fees/new-course-fee/new-course-fee.component';
import { NewFeeTypesComponent } from 'src/app/forms/fees/new-fee-types/new-fee-types.component';
import { UpdateFeeCategoryComponent } from 'src/app/forms/fees/update-fee-category/update-fee-category.component';
import { UpdateFeeTypesComponent } from 'src/app/forms/fees/update-fee-types/update-fee-types.component';
import { UpdateCourseFeeComponent } from 'src/app/forms/fees/update-course-fee/update-course-fee.component';
import { ManageFeeCategoriesComponent } from 'src/app/dialogs/manage-fee-categories/manage-fee-categories.component';

@Component({
  selector: 'app-manage-fee-types',
  templateUrl: './manage-fee-types.component.html',
  styleUrls: ['./manage-fee-types.component.css']
})
export class ManageFeeTypesComponent implements OnInit {

  feeTypesColumns: string[] = ['Type','Category','Update', 'Delete'];
  feeTypesData = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;



  constructor(private _requestService: requestService, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.FetchData();
  }

  ngAfterViewInit() {
     this.feeTypesData.sort = this.sort;
    this.feeTypesData.paginator = this.paginator;
  }

  filterFeeTypes(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches

    this.feeTypesData.filter = filterValue;
  }


  newFeeType() {
    this.dialog.open(NewFeeTypesComponent).afterClosed()
      .subscribe(result => {
        this.FetchData();
      });;
  }



  updateType(element) {
    this.dialog.open(UpdateFeeTypesComponent, {
      data: {
        element
      }
    }).afterClosed().subscribe(result => {
      this.FetchData();
    });
  }

  DeleteFeeType(id) {
    console.log(id + " Will be deleted");
    this._requestService.deleteFeeType(id)
      .subscribe
      (
        data => {
          if (data == "success") this.FetchData();
          else alert("Failed to delete");

          console.log(data);
        }
      )
  }



  FetchData() {
    this._requestService.getFeeTypes()
      .subscribe
      (
        data => {
          this.feeTypesData.data = data.data;
          console.log('printing Types');
          console.log(data.data);
        }
      )
  }


}
