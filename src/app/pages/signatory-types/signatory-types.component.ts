import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { requestService } from '../../services/request.service';
import { NewFeeCategoryComponent } from 'src/app/forms/fees/new-fee-category/new-fee-category.component';
import { UpdateFeeCategoryComponent } from 'src/app/forms/fees/update-fee-category/update-fee-category.component';
import { NewSignatoryTypeComponent } from 'src/app/forms/signatories/new-signatory-type/new-signatory-type.component';
import { UpdateSignatoryTypeComponent } from 'src/app/forms/signatories/update-signatory-type/update-signatory-type.component';


@Component({
  selector: 'app-signatory-types',
  templateUrl: './signatory-types.component.html',
  styleUrls: ['./signatory-types.component.css']
})
export class SignatoryTypesComponent implements OnInit {

  signatoryTypeColumns: string[] = ['Position', 'Update', 'Delete'];
  signatoryData = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private _requestService: requestService, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.FetchData();
  }

  ngAfterViewInit() {
    this.signatoryData.paginator = this.paginator;
    this.signatoryData.sort = this.sort;
  }

  filterFeeCategories(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.signatoryData.filter = filterValue;
  }

  newSignatoryType() {
    this.dialog.open(NewSignatoryTypeComponent).afterClosed()
      .subscribe(result => {
        this.FetchData();
      });;
  }


  updateSignatoryType(element) {
    this.dialog.open(UpdateSignatoryTypeComponent, {
      data: {
        element
      }
    }).afterClosed().subscribe(result => {
      this.FetchData();
    });
  }


  DeleteSignatoryType(id) {
    console.log(id + " Will be deleted");
    this._requestService.deleteSignatoryType(id)
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
    this._requestService.getSignatoryTypes()
      .subscribe
      (
        data => {
          this.signatoryData.data = data.data;
        }
      )

  }

}
