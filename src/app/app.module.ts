import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AppMaterialModule } from './app-material/app-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnrollmentComponent } from './pages/enrollment/enrollment.component';
import { HttpClientModule } from '@angular/common/http';
import { requestService } from './services/request.service';
import { DeleteRecordDialogComponent } from './dialogs/delete-record-dialog/delete-record-dialog.component';
import { DataManagementComponent } from './pages/data-management/data-management.component';
import { SubjectsComponent } from './tables/subjects/subjects.component';
import { AddSubjectFormComponent } from './forms/subjects/add-subject-form/add-subject-form.component';
import { DatePipe } from '@angular/common';
import { UpdateSubjectFormComponent } from './forms/subjects/update-subject-form/update-subject-form.component';
import { DepartmentsComponent } from './tables/departments/departments.component';
import { AddDepartmentFormComponent } from './forms/departments/add-department-form/add-department-form.component';
import { UpdateDepartmentFormComponent } from './forms/departments/update-department-form/update-department-form.component';
import { CoursesComponent } from './tables/courses/courses.component';
import { AddCourseFormComponent } from './forms/courses/add-course-form/add-course-form.component';
import { UpdateCourseFormComponent } from './forms/courses/update-course-form/update-course-form.component';
import { SemestersComponent } from './tables/semesters/semesters.component';
import { AddSemesterFormComponent } from './forms/semesters/add-semester-form/add-semester-form.component';
import { UpdateSemesterFormComponent } from './forms/semesters/update-semester-form/update-semester-form.component';
import { AddRoomFormComponent } from './forms/rooms/add-room-form/add-room-form.component';
import { UpdateRoomFormComponent } from './forms/rooms/update-room-form/update-room-form.component';
import { RoomsComponent } from './tables/rooms/rooms.component';
import { FacultyComponent } from './tables/faculty/faculty.component';
import { AddFacultyFormComponent } from './forms/faculty/add-faculty-form/add-faculty-form.component';
import { UpdateFacultyFormComponent } from './forms/faculty/update-faculty-form/update-faculty-form.component';
import { LevelsComponent } from './tables/levels/levels.component';
import { AddLevelFormComponent } from './forms/levels/add-level-form/add-level-form.component';
import { UpdateLevelFormComponent } from './forms/levels/update-level-form/update-level-form.component';
import { AddScheduleFormComponent } from './forms/schedules/add-schedule-form/add-schedule-form.component';
import { UpdateScheduleFormComponent } from './forms/schedules/update-schedule-form/update-schedule-form.component';
import { ViewFacultyComponent } from './forms/faculty/view-faculty/view-faculty.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { ScheduleBuilderFormComponent } from './forms/schedule-builder/schedule-builder-form/schedule-builder-form.component';
import { ScheduleViewComponent } from './tables/schedule-view/schedule-view.component';
import { AddStudentFormComponent } from './forms/student/add-student-form/add-student-form.component';
import { SchedulePickerComponent } from './tables/schedule-picker/schedule-picker.component';
import { StudentsComponent } from './tables/students/students.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { StudentEnrollmentsComponent } from './pages/student-enrollments/student-enrollments.component';
import { EnrollmentDetailDialogComponent } from './dialogs/enrollment-detail-dialog/enrollment-detail-dialog.component';
import { EditStudentGradesComponent } from './forms/edit-student-grades/edit-student-grades.component';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { AssesmentSetupComponent } from './tables/assesment-setup/assesment-setup.component';
import { NewFeeCategoryComponent } from './forms/fees/new-fee-category/new-fee-category.component';
import { NewFeeTypesComponent } from './forms/fees/new-fee-types/new-fee-types.component';
import { NewCourseFeeComponent } from './forms/fees/new-course-fee/new-course-fee.component';
import { UpdateFeeCategoryComponent } from './forms/fees/update-fee-category/update-fee-category.component';
import { UpdateFeeTypesComponent } from './forms/fees/update-fee-types/update-fee-types.component';
import { UpdateCourseFeeComponent } from './forms/fees/update-course-fee/update-course-fee.component';
import { MajorsComponent } from './tables/majors/majors.component';
import { AddMajorFormComponent } from './forms/majors/add-major-form/add-major-form.component';
import { UpdateMajorFormComponent } from './forms/majors/update-major-form/update-major-form.component';
import { CollegesComponent } from './tables/colleges/colleges.component';
import { AddCollegeFormComponent } from './forms/colleges/add-college-form/add-college-form.component';
import { UpdateCollegeFormComponent } from './forms/colleges/update-college-form/update-college-form.component';
import { SectionsComponent } from './tables/sections/sections.component';
import { AddSectionFormComponent } from './forms/sections/add-section-form/add-section-form.component';
import { UpdateSectionFormComponent } from './forms/sections/update-section-form/update-section-form.component';
import { CurriculumsComponent } from './pages/curriculums/curriculums.component';
import { LoginComponent } from './pages/login/login.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { AccountCreationComponent } from './pages/account-creation/account-creation.component';
import { ManageAccountsComponent } from './tables/manage-accounts/manage-accounts.component';
import { AddUacFormComponent } from './forms/user-accounts/add-uac-form/add-uac-form.component';
import { UpdateUacFormComponent } from './forms/user-accounts/update-uac-form/update-uac-form.component';
import { AddCurriculumFormComponent } from './forms/curriculums/add-curriculum-form/add-curriculum-form.component';
import { UpdateCurriculumFormComponent } from './forms/curriculums/update-curriculum-form/update-curriculum-form.component';
import { CurriculumInfoComponent } from './pages/curriculum-info/curriculum-info.component';
import { CurriculumViewComponent } from './pages/curriculum-view/curriculum-view.component';
import { AddCurriculumSubjectComponent } from './forms/curriculums/add-curriculum-subject/add-curriculum-subject.component';
import { SchoolYearComponent } from './tables/school-year/school-year.component';
import { AddSchoolYearComponent } from './forms/school-year/add-school-year/add-school-year.component';
import { UpdateSchoolYearComponent } from './forms/school-year/update-school-year/update-school-year.component';
import { SchedulesListComponent } from './pages/schedules-list/schedules-list.component';
import { CreateNewScheduleComponent } from './pages/create-new-schedule/create-new-schedule.component';
import { SelectFacultyComponent } from './dialogs/select-faculty/select-faculty.component';
import { SelectRoomComponent } from './dialogs/select-room/select-room.component';
import { EnrollmentFormComponent } from './pages/enrollment-form/enrollment-form.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentMasterListComponent } from './tables/student-master-list/student-master-list.component';
import { SelectScheduleComponent } from './dialogs/select-schedule/select-schedule.component';
import { AssesmentBreakdownComponent } from './pages/assesment-breakdown/assesment-breakdown.component';
import { NotesComponent } from './pages/notes/notes.component';
import { AddNoteFormComponent } from './forms/notes/add-note-form/add-note-form.component';
import { UpdateNoteFormComponent } from './forms/notes/update-note-form/update-note-form.component';
import { AssesmentsListComponent } from './pages/assesments-list/assesments-list.component';
import { EnrollmentViewComponent } from './pages/enrollment-view/enrollment-view.component';
import { StudentAssesmentsComponent } from './pages/student-assesments/student-assesments.component';
import { ManageFeeTypesComponent } from './dialogs/manage-fee-types/manage-fee-types.component';
import { ManageFeeCategoriesComponent } from './dialogs/manage-fee-categories/manage-fee-categories.component';
import { StudentGradesComponent } from './pages/student-grades/student-grades.component';
import { EnrollmentGradesComponent } from './pages/enrollment-grades/enrollment-grades.component';
import { ViewGradesComponent } from './pages/view-grades/view-grades.component';
import { GradeUpdateFormComponent } from './dialogs/grade-update-form/grade-update-form.component';
import { TransfereeShifterGradesComponent } from './pages/transferee-shifter-grades/transferee-shifter-grades.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { SignatoriesComponent } from './tables/signatories/signatories.component';
import { UpdateCurriculumSubjectComponent } from './forms/curriculums/update-curriculum-subject/update-curriculum-subject.component';
import { UpdateScheduleSubjectComponent } from './forms/schedule-subjects/update-schedule-subject/update-schedule-subject.component';
import { SelectSubjectViewComponent } from './forms/schedule-subjects/select-subject-view/select-subject-view.component';
import { SignatoryTypesComponent } from './pages/signatory-types/signatory-types.component';
import { NewSignatoryTypeComponent } from './forms/signatories/new-signatory-type/new-signatory-type.component';
import { UpdateSignatoryTypeComponent } from './forms/signatories/update-signatory-type/update-signatory-type.component';
import { NewSignatoryComponent } from './forms/signatories/new-signatory/new-signatory.component';
import { UpdateSignatoryComponent } from './forms/signatories/update-signatory/update-signatory.component';
import { SelectEnrollmentFeesComponent } from './select-enrollment-fees/select-enrollment-fees.component';
import { ChartCourseSelectionComponent } from './dialogs/chart-course-selection/chart-course-selection.component';
import { ScheduleReportsComponent } from './pages/schedule-reports/schedule-reports.component';
import { PrintScheduleReportComponent } from './pages/print-schedule-report/print-schedule-report.component';
import { GradeSheetComponent } from './pages/grade-sheet/grade-sheet.component';
import { GradeSheetReportComponent } from './pages/grade-sheet-report/grade-sheet-report.component';
import { CertificateOfEnrollmentComponent } from './pages/certificate-of-enrollment/certificate-of-enrollment.component';
import { CertificateOfEnrollmentReportComponent } from './pages/certificate-of-enrollment-report/certificate-of-enrollment-report.component';
import { EnrollmentListComponent } from './pages/enrollment-list/enrollment-list.component';
import { ListOfGradesComponent } from './pages/list-of-grades/list-of-grades.component';
import { ListOfGradesReportComponent } from './pages/list-of-grades-report/list-of-grades-report.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    EnrollmentComponent,
    DeleteRecordDialogComponent,
    DataManagementComponent,
    SubjectsComponent,
    AddSubjectFormComponent,
    UpdateSubjectFormComponent,
    DepartmentsComponent,
    AddDepartmentFormComponent,
    UpdateDepartmentFormComponent,
    CoursesComponent,
    AddCourseFormComponent,
    UpdateCourseFormComponent,
    SemestersComponent,
    AddSemesterFormComponent,
    UpdateSemesterFormComponent,
    AddRoomFormComponent,
    UpdateRoomFormComponent,
    RoomsComponent,
    FacultyComponent,
    AddFacultyFormComponent,
    UpdateFacultyFormComponent,
    LevelsComponent,
    AddLevelFormComponent,
    UpdateLevelFormComponent,
    SchedulesComponent,
    AddScheduleFormComponent,
    UpdateScheduleFormComponent,
    ViewFacultyComponent,
    ScheduleBuilderFormComponent,
    AddStudentFormComponent,
    SchedulePickerComponent,
    StudentsComponent,
    StudentProfileComponent,
    StudentEnrollmentsComponent,
    EnrollmentDetailDialogComponent,
    EditStudentGradesComponent,
    AssesmentSetupComponent,
    NewFeeCategoryComponent,
    NewFeeTypesComponent,
    NewCourseFeeComponent,
    UpdateFeeCategoryComponent,
    UpdateFeeTypesComponent,
    UpdateCourseFeeComponent,
    MajorsComponent,
    AddMajorFormComponent,
    UpdateMajorFormComponent,
    CollegesComponent,
    AddCollegeFormComponent,
    UpdateCollegeFormComponent,
    SectionsComponent,
    AddSectionFormComponent,
    UpdateSectionFormComponent,
    CurriculumsComponent,
    LoginComponent,
    UserManagementComponent,
    AccountCreationComponent,
    ManageAccountsComponent,
    AddUacFormComponent,
    UpdateUacFormComponent,
    AddCurriculumFormComponent,
    UpdateCurriculumFormComponent,
    CurriculumInfoComponent,
    CurriculumViewComponent,
    AddCurriculumSubjectComponent,
    SchoolYearComponent,
    AddSchoolYearComponent,
    UpdateSchoolYearComponent,
    SchedulesListComponent,
    CreateNewScheduleComponent,
    SelectFacultyComponent,
    SelectRoomComponent,
    EnrollmentFormComponent,
    StudentListComponent,
    StudentMasterListComponent,
    SelectScheduleComponent,
    AssesmentBreakdownComponent,
    NotesComponent,
    AddNoteFormComponent,
    UpdateNoteFormComponent,
    AssesmentsListComponent,
    EnrollmentViewComponent,
    StudentAssesmentsComponent,
    ManageFeeTypesComponent,
    ManageFeeCategoriesComponent,
    StudentGradesComponent,
    EnrollmentGradesComponent,
    ViewGradesComponent,
    GradeUpdateFormComponent,
    TransfereeShifterGradesComponent,
    DashboardComponent,
    SignatoriesComponent,
    UpdateCurriculumSubjectComponent,
    UpdateScheduleSubjectComponent,
    SelectSubjectViewComponent,
    SignatoryTypesComponent,
    NewSignatoryTypeComponent,
    UpdateSignatoryTypeComponent,
    NewSignatoryComponent,
    UpdateSignatoryComponent,
    SelectEnrollmentFeesComponent,
    ChartCourseSelectionComponent,
    ScheduleReportsComponent,
    PrintScheduleReportComponent,
    GradeSheetComponent,
    GradeSheetReportComponent,
    CertificateOfEnrollmentComponent,
    CertificateOfEnrollmentReportComponent,
    EnrollmentListComponent,
    ListOfGradesComponent,
    ListOfGradesReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgMaterialMultilevelMenuModule ,
    ChartsModule
  ],
  entryComponents:[
    DeleteRecordDialogComponent,
    AddSubjectFormComponent,
    UpdateSubjectFormComponent,
    AddDepartmentFormComponent,
    UpdateDepartmentFormComponent,
    AddCourseFormComponent,
    UpdateCourseFormComponent,
    AddSemesterFormComponent,
    UpdateSemesterFormComponent,
    AddRoomFormComponent,
    UpdateRoomFormComponent,
    UpdateFacultyFormComponent,
    AddFacultyFormComponent,
    AddLevelFormComponent,
    UpdateLevelFormComponent,
    UpdateScheduleFormComponent,
    EnrollmentDetailDialogComponent,
    EditStudentGradesComponent,
    NewFeeCategoryComponent,
    NewFeeTypesComponent,
    NewCourseFeeComponent,
    UpdateFeeCategoryComponent,
    UpdateFeeTypesComponent,
    UpdateCourseFeeComponent,
    AddMajorFormComponent,
    UpdateMajorFormComponent,
    AddCollegeFormComponent,
    UpdateCollegeFormComponent,
    AddSectionFormComponent,
    UpdateSectionFormComponent,
    UpdateUacFormComponent,
    AddCurriculumFormComponent,
    UpdateCurriculumFormComponent,
    AddCurriculumSubjectComponent,
    AddSchoolYearComponent,
    UpdateSchoolYearComponent,
    AddScheduleFormComponent,
    CreateNewScheduleComponent,
    SelectFacultyComponent,
    SelectRoomComponent,
    SelectScheduleComponent,
    AddNoteFormComponent,
    UpdateNoteFormComponent,
    ManageFeeTypesComponent,
    ManageFeeCategoriesComponent,
    GradeUpdateFormComponent,
    UpdateCurriculumSubjectComponent,
    UpdateScheduleSubjectComponent,
    SelectSubjectViewComponent,
    SignatoryTypesComponent,
    NewSignatoryTypeComponent,
    UpdateSignatoryTypeComponent,
    NewSignatoryComponent,
    UpdateSignatoryComponent,
    SelectEnrollmentFeesComponent,
    ChartCourseSelectionComponent
  ],
  
  providers: [requestService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
