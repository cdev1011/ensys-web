import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnrollmentComponent } from './pages/enrollment/enrollment.component';
import { DataManagementComponent } from './pages/data-management/data-management.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { AddStudentFormComponent } from './forms/student/add-student-form/add-student-form.component';
import { StudentsComponent } from './tables/students/students.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CurriculumViewComponent } from './pages/curriculum-view/curriculum-view.component'
import { EnrollmentFormComponent } from './pages/enrollment-form/enrollment-form.component'
import { UserManagementComponent } from './pages/user-management/user-management.component'
import { StudentListComponent } from './pages/student-list/student-list.component'
import { SchedulesListComponent } from './pages/schedules-list/schedules-list.component';
import { AssesmentBreakdownComponent } from './pages/assesment-breakdown/assesment-breakdown.component';
import { NotesComponent } from './pages/notes/notes.component';
import { AssesmentsListComponent } from './pages/assesments-list/assesments-list.component';
import { EnrollmentViewComponent } from './pages/enrollment-view/enrollment-view.component';
import { StudentAssesmentsComponent } from './pages/student-assesments/student-assesments.component';
import { StudentGradesComponent } from './pages/student-grades/student-grades.component';
import { EnrollmentGradesComponent } from './pages/enrollment-grades/enrollment-grades.component';
import { ViewGradesComponent } from './pages/view-grades/view-grades.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { ScheduleReportsComponent } from './pages/schedule-reports/schedule-reports.component';
import { PrintScheduleReportComponent } from './pages/print-schedule-report/print-schedule-report.component';
import { GradeSheetComponent } from './pages/grade-sheet/grade-sheet.component';
import { GradeSheetReportComponent } from './pages/grade-sheet-report/grade-sheet-report.component';
import { CertificateOfEnrollmentComponent } from './pages/certificate-of-enrollment/certificate-of-enrollment.component';
import { CertificateOfEnrollmentReportComponent } from './pages/certificate-of-enrollment-report/certificate-of-enrollment-report.component';
import { ListOfGradesComponent } from './pages/list-of-grades/list-of-grades.component';
import { ListOfGradesReportComponent } from './pages/list-of-grades-report/list-of-grades-report.component';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: 'user-management',
        component: UserManagementComponent
      },
      {
        path:'enrollment-form',
        component: EnrollmentFormComponent
      },
      {
        path:'student-list',
        component: StudentListComponent
      },
      {
        path: 'curriculum-view',
        component: CurriculumViewComponent
      },
      {
        path: 'schedule-list',
        component: SchedulesListComponent
      },
      {
        path: 'reports/schedule/gen',
        component: PrintScheduleReportComponent
      },
      {
        path: 'enrollment',
        component: EnrollmentComponent
      },
      {
        path: 'manage',
        component: DataManagementComponent
      },
      {
        path: 'schedules',
        component: SchedulesComponent
      },
      {
        path: 'add-student',
        component: AddStudentFormComponent
      },
      {
        path: 'student-list',
        component: StudentsComponent
      },
      {
        path: 'student-profile',
        component: StudentProfileComponent
      },
      {
        path: 'assesment',
        component: AssesmentBreakdownComponent
      },
      {
        path:'notes',
        component: NotesComponent
      },
      {
        path:'accounts/assesment',
        component: AssesmentsListComponent
      },
      {
        path: 'enrollment-info',
        component: EnrollmentViewComponent
      },
      {
        path: 'student-assesments',
        component: StudentAssesmentsComponent
      },
      {
        path: 'student-grading',
        component: StudentGradesComponent
      },
      {
        path:'enrollment/list',
        component: EnrollmentGradesComponent
      },
      {
        path:'enrollment/grades',
        component:ViewGradesComponent
      },
      {
        path:'reports/schedules',
        component: ScheduleReportsComponent
      },
      {
      path: 'reports/certificate-of-enrollment',
      component: CertificateOfEnrollmentComponent
      },
      {
        path:'reports/grade-sheet',
        component: GradeSheetComponent
      },
      {
        path:'reports/list-of-grades',
        component: ListOfGradesComponent
      },
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path: 'grade-sheet-report',
        component: GradeSheetReportComponent
      },
      {
        path: 'certificate-of-enrollment-report',
        component: CertificateOfEnrollmentReportComponent
      },
      {
        path: 'list-of-grades-report',
        component: ListOfGradesReportComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
