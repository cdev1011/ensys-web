import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-faculty-form',
  templateUrl: './update-faculty-form.component.html',
  styleUrls: ['./update-faculty-form.component.css']
})
export class UpdateFacultyFormComponent implements OnInit {

  public imagePath;
  imgURL: any;
  public message: string;

  @ViewChild('myform', { static: true })
  form: NgForm;

  SERVER_URL = "http://localhost:8000/api/faculty/update_profile_img";
  uploadForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _requestService: requestService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<UpdateFacultyFormComponent>, private snackBar: MatSnackBar,
    public datepipe: DatePipe, private httpClient: HttpClient, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.imgURL = "http://localhost:8000/app/public/" + this.data.element.faculty_PIC;
      this.form.controls['faculty_fname'].setValue(this.data.element.faculty_fname);
      this.form.controls['faculty_mname'].setValue(this.data.element.faculty_mname);
      this.form.controls['faculty_lname'].setValue(this.data.element.faculty_lname);
      this.form.controls['age'].setValue(this.data.element.age);
      this.form.controls['civil_status'].setValue(this.data.element.civil_status);
      this.form.controls['years_in_service'].setValue(this.data.element.years_in_service);
      this.form.controls['designation'].setValue(this.data.element.designation);
      this.form.controls['specialization'].setValue(this.data.element.specialization);
      this.form.controls['highest_educ_qualification'].setValue(this.data.element.highest_educ_qualification);
      this.form.controls['employment_status'].setValue(this.data.element.employment_status);
      this.form.controls['profesional_organization'].setValue(this.data.element.profesional_organization);
    })
  }

  onFileSelect(event) {

    console.log("Inside file select");

    if (event.target.files.length > 0) {

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();
      this.imagePath = event.target.files;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
      this.updateProfilePicture();
    }
  }

  updateProfilePicture() {
    const formData = new FormData();
    formData.append('profile', this.uploadForm.get('profile').value);
    formData.append('faculty_id', this.data.element.faculty_id);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }

  update(form: NgForm) {

    var data =
    {
      "faculty_id": this.data.element.faculty_id,
      "faculty_fname": form.value.faculty_fname,
      "faculty_mname": form.value.faculty_mname,
      "faculty_lname": form.value.faculty_lname,
      "age": form.value.age,
      "civil_status": form.value.civil_status,
      "designation": form.value.designation,
      "years_in_service": form.value.years_in_service,
      "profesional_organization": form.value.profesional_organization,
      "specialization": form.value.specialization,
      "highest_educ_qualification": form.value.highest_educ_qualification,
      "employment_status": form.value.employment_status
    };

    this._requestService.updateFaculty(data)
      .subscribe
      (
        success => {
          console.log("Faculty Updated"),
            this.dialogRef.close();
        }
      )
  }

}
