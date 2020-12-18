import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { requestService } from 'src/app/services/request.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { SelectScheduleComponent } from 'src/app/dialogs/select-schedule/select-schedule.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css']
})
export class EnrollmentFormComponent implements OnInit {

  uploadForm: FormGroup;
  enrollmentForm: FormGroup;
  feeForm: FormGroup;
  

  @ViewChild('myform', { static: true })
  form: NgForm

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns: string[] = ['student_id', 'student_fullname', 'select'];
  dataSource = new MatTableDataSource();

  selSubColumn: string[] = ['course_no', 'subject_desc', 'units', 'time', 'days', 'room', 'instructor', 'remove'];
  selSubSource = new MatTableDataSource();
  subInfo = []; //where we store our subjects/schedules we have selected

  courseFeesColumns: string[] = ['course_desc', 'fee_type_desc', 'sy_id', 'price', 'select'];
  courseFeesData = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) Feepaginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) Feesort: MatSort;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog,
    private router: Router, private _requestService: requestService, private httpClient: HttpClient, public datepipe: DatePipe) { }

  isNewRecord = true;
  isOldStudent = true;
  enrollmentType = "";
  isTransferee: any;
  profile_img_path = "";
  student_id = 0;
  courses = [];
  semesters = [];
  schoolYears = [];
  enrollmentId = 0;
  levels = [];

  ngOnInit() {

    this.FetchData();
    this.fetchCourses();
    this.FetchSemesters();
    this.FetchSchoolYears();
    this.FetchLevels();

    this.uploadForm = this.formBuilder.group({
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
      current_year: "",
    });

    this.enrollmentForm = this.formBuilder.group({
      StudentId: "",
      EnrollmentCourse: "",
      SchoolYear: "",
      EnrollmentSemester: "",
      CurrentLevel: "",
      processed_by:""
    });

    this.feeForm = this.formBuilder.group({
      selectedFees: "",
    });
  }

  FetchLevels() {
    this._requestService.getLevels()
      .subscribe
      (
        data => {
          this.levels = data.data;
        }
      )
  }

  FetchSchoolYears() {
    this._requestService.getSchoolYears()
      .subscribe
      (
        data => {
          this.schoolYears = data.data;
        }
      )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.courseFeesData.sort = this.Feesort;
    this.courseFeesData.paginator = this.Feepaginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  courseChanged(event) {
    this._requestService.getFeeByCourse(event.value)
      .subscribe
      (
        data => {
          this.courseFeesData.data = data.data;
          console.log('printing Course Fees');
          console.log(data.data);
        }
      )
  }

  SelectedFeeArray = [];

  feeSelected(event) {

    var item = event.source.value;
    if (event.checked) {

      console.log("Adding " + item);
      this.SelectedFeeArray.push(item);

    } else {
      console.log("removing " + event.source.value)

      const index = this.SelectedFeeArray.indexOf(item);

      if (index >= 0) {
        this.SelectedFeeArray.splice(index, 1);
      }
    }

    console.log("Selected Fees Array: " + this.SelectedFeeArray);
  }

  FetchData() {
    this._requestService.getStudents()
      .subscribe
      (
        data => {
          this.dataSource.data = data.data;
        }
      )

  }

  InitStudentReg(enrollment_type) {
    this.isNewRecord = false;
    this.isOldStudent = true;
    this.enrollmentType = enrollment_type;

    if (enrollment_type == "Transferee") {
      this.isTransferee = '1';
    } else {
      this.isTransferee = '0';
    }
  }

  InitStudentInfo() {
    this.isNewRecord = true;
    this.isOldStudent = !this.isOldStudent;
    this.enrollmentType = ""

  }

  SelectStudent(id) {
    this.student_id = id;
    this.enrollmentForm.get('StudentId').setValue(this.student_id);
    console.log("Student Selected. [ID] is now:  " + this.student_id);
  }

  submit() {

    this.enrollmentForm.get('processed_by').setValue(localStorage.getItem("user_id"));

    if (this.enrollmentType != "") {
      //Submit new student information to database
      this.submitStudentData();
    } else {
      console.log("Processing Enrollment for student ID: " + this.student_id);
      //Enroll the selected subjects
      this.SaveEnrollmentInfo();
    }
  }


  //Start of profile image

  public imagePath;
  imgURL: any;
  public message: string;

  SERVER_URL = "http://localhost:8000/api/students/new";

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
      this.uploadForm.get('student_photo').setValue(file);
    }
  }

  submitStudentData() {

    const formData = new FormData();
    formData.append('student_photo', this.uploadForm.get('student_photo').value);
    formData.append('student_fname', this.uploadForm.get('student_fname').value);
    formData.append('student_mname', this.uploadForm.get('student_mname').value);
    formData.append('student_lname', this.uploadForm.get('student_lname').value);
    formData.append('date_of_birth', this.uploadForm.get('date_of_birth').value);
    formData.append('age', this.uploadForm.get('age').value);
    formData.append('gender', this.uploadForm.get('gender').value);
    formData.append('birthplace', this.uploadForm.get('birthplace').value);
    formData.append('mobile_number', this.uploadForm.get('mobile_number').value);
    formData.append('course_id', this.uploadForm.get('course_id').value);
    formData.append('home_address', this.uploadForm.get('home_address').value);
    formData.append('fathers_name', this.uploadForm.get('fathers_name').value);
    formData.append('fathers_occup', this.uploadForm.get('fathers_occup').value);
    formData.append('mothers_name', this.uploadForm.get('mothers_name').value);
    formData.append('mother_occup', this.uploadForm.get('mother_occup').value);
    formData.append('parent_tel', this.uploadForm.get('parent_tel').value);
    formData.append('guardian_name', this.uploadForm.get('guardian_name').value);
    formData.append('guardian_rel', this.uploadForm.get('guardian_rel').value);
    formData.append('guradian_Addr', this.uploadForm.get('guradian_Addr').value);
    formData.append('guardian_occup', this.uploadForm.get('guardian_occup').value);
    formData.append('guardian_tel', this.uploadForm.get('guardian_tel').value);
    formData.append('elem_attended', this.uploadForm.get('elem_attended').value);
    formData.append('elem_yrs_attd', this.uploadForm.get('elem_yrs_attd').value);
    formData.append('hs_attended', this.uploadForm.get('hs_attended').value);
    formData.append('hs_yrs_attd', this.uploadForm.get('hs_yrs_attd').value);
    formData.append('lst_cllg_attd', this.uploadForm.get('lst_cllg_attd').value);
    formData.append('attd_cllg_lvl', this.uploadForm.get('attd_cllg_lvl').value);
    formData.append('attd_cllg_sy', this.uploadForm.get('attd_cllg_sy').value);
    formData.append('creds_presented', this.uploadForm.get('creds_presented').value);
    formData.append('transferee_flag', this.isTransferee);
    formData.append('current_year', this.uploadForm.get('current_year').value);

    console.log("Saving student information....");
    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => {
        console.log(res);
        this.student_id = res;
        this.enrollmentForm.get('StudentId').setValue(this.student_id);
        console.log("Student Selected. [ID] is now:  " + this.student_id);
        this.SaveEnrollmentInfo();
      },
      (err) => console.log(err)
    );
  }

  SaveEnrollmentInfo() {
    //Store the enrollment information 
    console.log("Processing enrollment Info....");

    this._requestService.newEnrollment(this.enrollmentForm.value)
      .subscribe
      (
        data => {
          console.log(data);
          this.enrollmentId = data;
          this.ProcessSchedules(data)
          this.ProcessEnrollmentFees(data);
        }
      )
  }

  ProcessSchedules(enrollmentId) {
    this.subInfo.forEach(subject => {

      var subjects = {
        "enrollment_id": enrollmentId,
        "sched_sub_id": subject.sched_sub_id
      }

      this._requestService.newSubjectEnrollment(subjects)
        .subscribe
        (
          data => {
            console.log(data);
          }
        )
    });
  }

  ProcessEnrollmentFees(enrollmentId) {
    this.SelectedFeeArray.forEach(fee => {

      console.log("Inserting to DB Fee: " + fee);
      var enrollmentFees = {
        "enrollment_id": enrollmentId,
        "course_fee_id": fee
      }

      this._requestService.newEnrollmentFee(enrollmentFees)
        .subscribe
        (
          data => {
            console.log(data);
          }
        )
    });
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

  FetchSemesters() {
    this._requestService.getSemesters()
      .subscribe
      (
        data => {
          console.log(data);
          this.semesters = data.data;
        }
      )
  }

  addScheduleToList() {

    this.dialog.open(SelectScheduleComponent)
      .afterClosed()
      .subscribe(result => {
        this.subInfo.push({
          sched_sub_id: result.sched_sub_id,
          subject_desc: result.descriptive_title,
          course_no: result.course_no,
          units: result.curr_subject_units,
          time: result.start_time + " - " + result.end_time,
          days: result.days,
          room: result.room_desc,
          instructor: result.faculty_fname + " " + result.faculty_mname + " " + result.faculty_lname
        })

        this.selSubSource.data = this.subInfo;
      });
  }

  removeSched(sched) {
    const index = this.subInfo.indexOf(sched, 0);
    if (index > -1) {
      this.subInfo.splice(index, 1);
    }
    this.selSubSource.data = this.subInfo;
  }

  generateAssesment() {
    this.router.navigate(['/assesment'], { queryParams: { id: this.enrollmentId } });
  }

  viewProfile() {
    this.router.navigate(['/student-profile'], { queryParams: { student_id: this.student_id } });
  }

}
