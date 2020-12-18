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
@Component({
  selector: 'app-assesment-setup',
  templateUrl: './assesment-setup.component.html',
  styleUrls: ['./assesment-setup.component.css']
})
export class AssesmentSetupComponent implements OnInit {

  courseFeesColumns: string[] = ['course_desc', 'fee_type_desc', 'sy_id', 'price', 'Update', 'Delete'];
  courseFeesData = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;



  constructor(private _requestService: requestService, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.FetchData();
  }

  ngAfterViewInit() {
    // this.feeCategoryData.paginator = this.paginator;
    // this.feeCategoryData.sort = this.sort;
    // this.feeTypesData.sort = this.sort;
    this.courseFeesData.sort = this.sort;
    this.courseFeesData.paginator = this.paginator;
  }

  // filterFeeTypes(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches

  //   this.feeTypesData.filter = filterValue;
  // }

  filterCourseFees(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches

    this.courseFeesData.filter = filterValue;
  }

  // filterFeeCategories(filterValue: string){
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  //   this.feeCategoryData.filter = filterValue;
  // }

  newFeeCategory() {
    this.dialog.open(NewFeeCategoryComponent).afterClosed()
      .subscribe(result => {
        this.FetchData();
      });;
  }

  newFeeType() {
    this.dialog.open(NewFeeTypesComponent).afterClosed()
      .subscribe(result => {
        this.FetchData();
      });;
  }

  newCourseFee() {
    this.dialog.open(NewCourseFeeComponent).afterClosed()
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

  updateCourseFee(element) {
    this.dialog.open(UpdateCourseFeeComponent, {
      data: {
        element
      }
    }).afterClosed().subscribe(result => {
      this.FetchData();
    });
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

  DeleteCourseFee(id) {
    console.log(id + " Will be deleted");
    this._requestService.deleteCourseFee(id)
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
    // this._requestService.getFeeCategory()
    // .subscribe
    // (
    //   data => {
    //     this.feeCategoryData.data = data.data;
    //   console.log('printing Category');
    //     console.log(data.data);
    //   }
    // )

    // this._requestService.getFeeTypes()
    // .subscribe
    // (
    //   data => {
    //     this.feeTypesData.data = data.data;
    //   console.log('printing Types');
    //     console.log(data.data);
    //   }
    // )

    this._requestService.getCourseFees()
      .subscribe
      (
        data => {
          this.courseFeesData.data = data.data;
          console.log('printing Course Fees');
          console.log(data.data);
        }
      )
  }


  ManageFeeTypes() {
    this.dialog.open(ManageFeeTypesComponent, {
    }).afterClosed().subscribe(result => {
      this.FetchData();
    });
  }

  ManageFeeCategory() {
    this.dialog.open(ManageFeeCategoriesComponent, {
    }).afterClosed().subscribe(result => {
      this.FetchData();
    });
  }

}
