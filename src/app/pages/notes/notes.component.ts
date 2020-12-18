import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort,MatDialog, MAT_DIALOG_DATA,MatSnackBar, MatDialogRef } from '@angular/material';
import { requestService } from '../../services/request.service';
import { Comments } from '../../classes/comments';
import { AddNoteFormComponent } from 'src/app/forms/notes/add-note-form/add-note-form.component';
import { UpdateNoteFormComponent } from 'src/app/forms/notes/update-note-form/update-note-form.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  displayedColumns: string[] = ['note_title','Update', 'Delete'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private _requestService: requestService,public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.FetchData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  newRecord() {
    this.dialog.open(AddNoteFormComponent).afterClosed()
    .subscribe(result => {
      this.FetchData();
    });;
  }

  UpdateItem(element) {
    this.dialog.open(UpdateNoteFormComponent, {
      data: {
        element
      }
    }).afterClosed().subscribe(result => {
      this.FetchData();
    });
  }

  DeleteLevel(id){
    console.log(id + " Will be deleted");
    this._requestService.deleteNote(id)
    .subscribe
    (
      data => {
        if(data == "success") this.FetchData();
        else alert("Failed to delete");

        console.log(data);
      }
    )
  }

  FetchData(){
    this._requestService.getNotes()
    .subscribe
    (
      data => {
        this.dataSource.data = data.data;
      }
    )
  }

}
