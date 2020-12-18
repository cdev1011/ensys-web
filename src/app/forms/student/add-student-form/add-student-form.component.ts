import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-student-form',
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.css']
})
export class AddStudentFormComponent implements OnInit {

  SERVER_URL = "http://localhost:8000/api/students/new";
  uploadForm: FormGroup;  

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient,public datepipe: DatePipe,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: "",
      fname: "",
      mname: "",
      lname: "",
      gender: "",
      date_of_birth: "",
      birthplace: "",
      contact_num: "",
      father_name: "",
      mother_name: "",
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
    formData.append('fname', this.uploadForm.get('fname').value);
    formData.append('mname', this.uploadForm.get('mname').value);
    formData.append('lname', this.uploadForm.get('lname').value);
    formData.append('gender', this.uploadForm.get('gender').value);
    formData.append('date_of_birth', this.datepipe.transform(this.uploadForm.get('date_of_birth').value,'yyyy-MM-dd'));
    formData.append('birthplace', this.uploadForm.get('birthplace').value);
    formData.append('contact_no', this.uploadForm.get('contact_num').value);
    formData.append('father_name', this.uploadForm.get('father_name').value);
    formData.append('mother_name', this.uploadForm.get('mother_name').value);

    console.log(formData);
    
    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) =>{
        this.uploadForm.reset();
        this.openSnackBar("New Student added!");
        console.log(res);
      },
      (err) => console.log(err)
    );
  }

  
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
