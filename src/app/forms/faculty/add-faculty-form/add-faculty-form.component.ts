import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-faculty-form',
  templateUrl: './add-faculty-form.component.html',
  styleUrls: ['./add-faculty-form.component.css']
})
export class AddFacultyFormComponent implements OnInit {

  SERVER_URL = "http://localhost:8000/api/faculty/new";
  uploadForm: FormGroup;  

    constructor(private formBuilder: FormBuilder, private httpClient: HttpClient,public datepipe: DatePipe,
      public dialogRef: MatDialogRef<AddFacultyFormComponent>) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: [''],
      faculty_fname: "",
      faculty_mname: "",
      faculty_lname: "",
      gender: "",
      age: "",
      civil_status: "",
      designation: "",
      years_in_service: "",
      profesional_organization: "",
      specialization: "",
      highest_educ_qualification: "",
      employment_status: "",
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('profile', this.uploadForm.get('profile').value);
    formData.append('faculty_fname', this.uploadForm.get('faculty_fname').value);
    formData.append('faculty_mname', this.uploadForm.get('faculty_mname').value);
    formData.append('faculty_lname', this.uploadForm.get('faculty_lname').value);
    formData.append('age', this.uploadForm.get('age').value);
    formData.append('civil_status', this.uploadForm.get('civil_status').value);
    formData.append('designation', this.uploadForm.get('designation').value);
    formData.append('years_in_service', this.uploadForm.get('years_in_service').value);
    formData.append('profesional_organization', this.uploadForm.get('profesional_organization').value);
    formData.append('specialization', this.uploadForm.get('specialization').value);
    formData.append('highest_educ_qualification', this.uploadForm.get('highest_educ_qualification').value);
    formData.append('employment_status', this.uploadForm.get('employment_status').value);
    
    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) =>{
        this.dialogRef.close();
      },
      (err) => console.log(err)
    );
  }


}
