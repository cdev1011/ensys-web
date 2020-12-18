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

@Component({
  selector: 'app-manage-fee-categories',
  templateUrl: './manage-fee-categories.component.html',
  styleUrls: ['./manage-fee-categories.component.css']
})
export class ManageFeeCategoriesComponent implements OnInit {

  feeCategoryColumns: string[] = ['Category', 'Update', 'Delete'];
  feeCategoryData = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private _requestService: requestService, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.FetchData();
  }

  ngAfterViewInit() {
    this.feeCategoryData.paginator = this.paginator;
    this.feeCategoryData.sort = this.sort;
  }

  filterFeeCategories(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.feeCategoryData.filter = filterValue;
  }

  newFeeCategory() {
    this.dialog.open(NewFeeCategoryComponent).afterClosed()
      .subscribe(result => {
        this.FetchData();
      });;
  }


  updateCategory(element) {
    this.dialog.open(UpdateFeeCategoryComponent, {
      data: {
        element
      }
    }).afterClosed().subscribe(result => {
      this.FetchData();
    });
  }


  DeleteCategory(id) {
    console.log(id + " Will be deleted");
    this._requestService.deleteFeeCategory(id)
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
    this._requestService.getFeeCategory()
      .subscribe
      (
        data => {
          this.feeCategoryData.data = data.data;
          console.log('printing Category');
          console.log(data.data);
        }
      )

  }
}
