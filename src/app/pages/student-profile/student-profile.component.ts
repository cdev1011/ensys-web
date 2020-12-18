import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { requestService } from 'src/app/services/request.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  imgURL: any;
  student_id: any;
  uploadForm: FormGroup;
  public imagePath;
  isEditMode = true;
  isViewMode = false;
  studentInformation: any;
  courses = [];
  levels = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns: string[] = ['year_semester', 'course', 'enrollement_date', 'Update', 'Delete'];
  dataSource = new MatTableDataSource();

  SERVER_URL = "http://localhost:8000/api/students/update_profile_img";

  constructor(public datepipe: DatePipe, private route: ActivatedRoute,
    private _requestService: requestService, private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, private httpClient: HttpClient,private router: Router) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.student_id = params['student_id'];
      this.PopulateProfile();
    });

    this.fetchCourses();
    this.FetchEnrollments();
    this.fetchLevels();


    this.uploadForm = this.formBuilder.group({
      profile: [''],
      student_photo: "",
      student_fname: "",
      student_mname: "",
      student_lname: "",
      date_of_birth: "",
      age: "",
      gender: "",
      birthplace: "",
      mobile_number: "",
      course_id: "",
      home_address: "",
      fathers_name: "",
      fathers_occup: "",
      mothers_name: "",
      mother_occup: "",
      parent_tel: "",
      guardian_name: "",
      guardian_rel: "",
      guradian_Addr: "",
      guardian_occup: "",
      guardian_tel: "",
      elem_attended: "",
      elem_yrs_attd: "",
      hs_attended: "",
      hs_yrs_attd: "",
      lst_cllg_attd: "",
      attd_cllg_lvl: "",
      attd_cllg_sy: "",
      creds_presented: "",
      transferee_flag: 0,
      enrollment_course: "",
      enrollment_status: "",
      current_year: "",
    });

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

  FetchEnrollments() {
    this._requestService.getStudentEnrollments(this.student_id)
      .subscribe
      (
        data => {
          console.log(data);
          this.dataSource.data = data.data;
        }
      )
  }

  toggleEdit() {
    this.isEditMode = !this.isEditMode;
    this.isViewMode = !this.isViewMode;
  }


  fetchCourses() {
    this._requestService.getCourses()
      .subscribe
      (
        data => {
          this.courses = data.data;
        }
      )
  }

  fetchLevels() {
    this._requestService.getLevels()
      .subscribe
      (
        data => {
          this.levels = data.data;
        }
      )
  }

  isTransferee(type){
    if(type == 0){
      return "No"
    }else{
      return "Yes"
    }
  }
  
  PopulateProfile() {
    this._requestService.getStudent(this.student_id)
      .subscribe
      (
        data => {
          console.log(data.data);
          this.imgURL = "http://localhost:8000/app/public/" + data.data.student_photo;
          this.studentInformation = data.data;

          this.uploadForm.get('student_fname').setValue(data.data.student_fname);
          this.uploadForm.get('student_mname').setValue(data.data.student_mname);
          this.uploadForm.get('student_lname').setValue(data.data.student_lname);
          this.uploadForm.get('date_of_birth').setValue(data.data.date_of_birth);
          this.uploadForm.get('age').setValue(data.data.age);
          this.uploadForm.get('gender').setValue(data.data.gender);
          this.uploadForm.get('birthplace').setValue(data.data.birthplace);
          this.uploadForm.get('mobile_number').setValue(data.data.mobile_number);
          this.uploadForm.get('course_id').setValue(data.data.course_id);
          this.uploadForm.get('home_address').setValue(data.data.home_address);
          this.uploadForm.get('fathers_name').setValue(data.data.fathers_name);
          this.uploadForm.get('fathers_occup').setValue(data.data.fathers_occup);
          this.uploadForm.get('mothers_name').setValue(data.data.mothers_name);
          this.uploadForm.get('mother_occup').setValue(data.data.mother_occup);
          this.uploadForm.get('parent_tel').setValue(data.data.parent_tel);
          this.uploadForm.get('guardian_name').setValue(data.data.guardian_name);
          this.uploadForm.get('guardian_rel').setValue(data.data.guardian_rel);
          this.uploadForm.get('guardian_occup').setValue(data.data.guardian_occup);
          this.uploadForm.get('guradian_Addr').setValue(data.data.guradian_Addr);
          this.uploadForm.get('guardian_tel').setValue(data.data.guardian_tel);
          this.uploadForm.get('elem_attended').setValue(data.data.elem_attended);
          this.uploadForm.get('elem_attended').setValue(data.data.elem_attended);
          this.uploadForm.get('elem_yrs_attd').setValue(data.data.elem_yrs_attd);
          this.uploadForm.get('hs_attended').setValue(data.data.hs_attended);
          this.uploadForm.get('hs_yrs_attd').setValue(data.data.hs_yrs_attd);
          this.uploadForm.get('lst_cllg_attd').setValue(data.data.lst_cllg_attd);
          this.uploadForm.get('attd_cllg_lvl').setValue(data.data.attd_cllg_lvl);
          this.uploadForm.get('attd_cllg_sy').setValue(data.data.attd_cllg_sy);
          this.uploadForm.get('lst_cllg_attd').setValue(data.data.lst_cllg_attd);
          this.uploadForm.get('enrollment_status').setValue(data.data.enrollment_status);
          this.uploadForm.get('current_year').setValue(data.data.level_id);
        }
      )
  }

  ProfileUpdate() {

    var data =
    {
      'student_id': this.student_id,
      'student_fname': this.uploadForm.get('student_fname').value,
      'student_mname': this.uploadForm.get('student_mname').value,
      'student_lname': this.uploadForm.get('student_lname').value,
      'date_of_birth': this.uploadForm.get('date_of_birth').value,
      'age': this.uploadForm.get('age').value,
      'gender': this.uploadForm.get('gender').value,
      'birthplace': this.uploadForm.get('birthplace').value,
      'mobile_number': this.uploadForm.get('mobile_number').value,
      'course_id': this.uploadForm.get('course_id').value,
      'home_address': this.uploadForm.get('home_address').value,
      'fathers_name': this.uploadForm.get('fathers_name').value,
      'fathers_occup': this.uploadForm.get('fathers_occup').value,
      'mothers_name': this.uploadForm.get('mothers_name').value,
      'mother_occup': this.uploadForm.get('mother_occup').value,
      'parent_tel': this.uploadForm.get('parent_tel').value,
      'guardian_name': this.uploadForm.get('guardian_name').value,
      'guardian_rel': this.uploadForm.get('guardian_rel').value,
      'guardian_occup': this.uploadForm.get('guardian_occup').value,
      'guradian_Addr': this.uploadForm.get('guradian_Addr').value,
      'guardian_tel': this.uploadForm.get('guardian_tel').value,
      'elem_attended': this.uploadForm.get('elem_attended').value,
      'elem_yrs_attd': this.uploadForm.get('elem_yrs_attd').value,
      'hs_attended': this.uploadForm.get('hs_attended').value,
      'hs_yrs_attd': this.uploadForm.get('hs_yrs_attd').value,
      'lst_cllg_attd': this.uploadForm.get('lst_cllg_attd').value,
      'attd_cllg_lvl': this.uploadForm.get('attd_cllg_lvl').value,
      'attd_cllg_sy': this.uploadForm.get('attd_cllg_sy').value,
      'enrollment_status': this.uploadForm.get('enrollment_status').value,
      'current_year': this.uploadForm.get('current_year').value,
    };

    console.log(data);

    this._requestService.updateStudentProfile(data)
      .subscribe
      (
        success => {
          console.log(success);
          this.PopulateProfile();
          this.openSnackBar("Profile Updated");
        }
      )
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  onFileSelect(event) {

    console.log("Inside file select");

    if (event.target.files.length > 0) {

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
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
    formData.append('student_id', this.student_id);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }

  viewEnrollment(id) {
    this.router.navigate(['/enrollment-info'], { queryParams: { enrollment_id: id } });
  }
}
