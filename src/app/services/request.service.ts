import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class requestService {

    constructor(private httpclient: HttpClient) { }

    getSubjects(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/subjects");
    }

    getSubject(subject): Observable<any> {
        console.log(subject);
        return this.httpclient.get("http://localhost:8000/api/subjects/" + subject.subjectId);
    }

    newSubject(subject): Observable<any> {
        console.log("Sending to API");
        return this.httpclient.post("http://localhost:8000/api/subjects/new", subject);
    }

    updateSubject(subject): Observable<any> {
        console.log(subject);
        return this.httpclient.put("http://localhost:8000/api/subjects/update", subject);
    }

    deleteSubject(subject): Observable<any> {
        console.log("Deleting >>>> " + subject);
        return this.httpclient.delete("http://localhost:8000/api/subjects/delete/" + subject);
    }

    //Departments
    getDepartments(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/departments");
    }

    newDepartment(department): Observable<any> {
        console.log("Adding new department....");
        return this.httpclient.post("http://localhost:8000/api/departments/new", department);
    }

    updateDepartment(department): Observable<any> {
        console.log(department);
        return this.httpclient.put("http://localhost:8000/api/departments/update", department);
    }

    deleteDepartment(department): Observable<any> {

        return this.httpclient.delete("http://localhost:8000/api/departments/delete/" + department);
    }

    //courses
    getCourses(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/courses");
    }

    newCourse(course): Observable<any> {
        console.log("Sending to API");
        return this.httpclient.post("http://localhost:8000/api/courses/new", course);
    }

    updateCourse(course): Observable<any> {
        console.log("Sending to API");
        return this.httpclient.put("http://localhost:8000/api/courses/update", course);
    }

    deleteCourse(course): Observable<any> {

        return this.httpclient.delete("http://localhost:8000/api/courses/delete/" + course);
    }


    CourseFee(course): Observable<any> {
        console.log("Sending to API");
        return this.httpclient.post("http://localhost:8000/api/courses/fee", course);
    }

    

    //semesters
    getSemesters(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/semesters");
    }

    newSemester(semester): Observable<any> {
        console.log("Sending to API");
        return this.httpclient.post("http://localhost:8000/api/semesters/new", semester);
    }

    updateSemester(semester): Observable<any> {
        console.log("Sending to API");
        return this.httpclient.put("http://localhost:8000/api/semesters/update", semester);
    }

    deleteSemester(semester): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/semesters/delete/" + semester);
    }

    //rooms
    getRooms(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/rooms");
    }

    newRoom(room): Observable<any> {
        console.log("Sending to API");
        return this.httpclient.post("http://localhost:8000/api/rooms/new", room);
    }

    updateRoom(room): Observable<any> {
        console.log("Sending to API");
        return this.httpclient.put("http://localhost:8000/api/rooms/update", room);
    }

    deleteRoom(room): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/rooms/delete/" + room);
    }

    //faculty
    getFaculty(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/faculty");
    }

    newFaculty(faculty): Observable<any> {
        console.log("Sending to API");
        return this.httpclient.post("http://localhost:8000/api/faculty/new", faculty);
    }

    updateFaculty(faculty): Observable<any> {
        console.log("Sending to API");
        return this.httpclient.put("http://localhost:8000/api/faculty/update", faculty);
    }

    updateFacultyProfileImg(faculty): Observable<any> {
        console.log("Sending to API");
        return this.httpclient.put("http://localhost:8000/api/faculty/update_profile_img", faculty);
    }

    deleteFaculty(faculty): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/faculty/delete/" + faculty);
    }

    //levels
    getLevels(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/levels");
    }

    newLevel(level): Observable<any> {
        console.log("Sending to API");
        return this.httpclient.post("http://localhost:8000/api/levels/new", level);
    }

    updateLevel(level): Observable<any> {
        console.log("Sending to API");
        return this.httpclient.put("http://localhost:8000/api/levels/update", level);
    }

    deleteLevel(level): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/levels/delete/" + level);
    }

    //schedules
    getSchedules(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/schedules");
    }

    newSchedule(schedules): Observable<any> {
        console.log("Sending to API");
        return this.httpclient.post("http://localhost:8000/api/schedules/new", schedules);
    }


    updateSchedule(schedules): Observable<any> {
        return this.httpclient.put("http://localhost:8000/api/schedules/update", schedules);
    }


    deleteSchedule(schedules): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/schedules/delete/" + schedules);
    }

    //students
    getStudent(student): Observable<any> {
        console.log(student);
        return this.httpclient.get("http://localhost:8000/api/students/" + student);
    }

    updateStudentProfile(students): Observable<any> {
        return this.httpclient.put("http://localhost:8000/api/students/update", students);
    }

    getStudents(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/students");
    }

    getStudentList(flag): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/students/list/" + flag);
    }
    
    

    //enrollment
    getEnrollments(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/enrollments");
    }

    newEnrollment(enrollment): Observable<any> {
        console.log("Sending to API");
        return this.httpclient.post("http://localhost:8000/api/enrollment/new", enrollment);
    }

    getStudentEnrollments(student): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/enrollments/student/" + student);
    }

    getEnrollment(enrollment_id): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/enrolled-subjects/" + enrollment_id);
    }

    //get subject enrolled
    getEnrolledSubject(enrolled_sub_id): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/enrolled-subject/" + enrolled_sub_id);
    }

    removeEnrolledSubject(enrolled_sub_id): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/enrolled-subjects/delete/" + enrolled_sub_id);
    }

    addGrades(grade): Observable<any> {
        console.log("Sending to API");
        return this.httpclient.post("http://localhost:8000/api/grades/new", grade);
    }

    //Fees
    getFeeCategory(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/fee-category");
    }

    newFeeCategory(category): Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/fee-category/new", category);
    }

    newEnrollmentFee(fee): Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/enrollment/fees/new", fee);
    }

    updateFeeCategory(category): Observable<any> {
        console.log("Sending to API");
        return this.httpclient.put("http://localhost:8000/api/fee-category/update", category);
    }

    deleteFeeCategory(category): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/fee-category/delete/" + category);
    }

    getFeeTypes(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/fee-types");
    }

    newFeeType(type): Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/fee-types/new", type);
    }

    deleteFeeType(types): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/fee-types/delete/" + types);
    }

    updateFeeType(types): Observable<any> {
        console.log("Sending to API");
        return this.httpclient.put("http://localhost:8000/api/fee-types/update", types);
    }

    getCourseFees(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/course-fees");
    }

    getFeeByCourse(id): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/course-fees/course/" + id);
    }

    AddCourseFees(courseFee): Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/course-fees/new", courseFee);
    }

    updateCourseFees(courseFee): Observable<any> {
        return this.httpclient.put("http://localhost:8000/api/course-fees/update", courseFee);
    }

    deleteCourseFee(courseFee): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/course-fees/delete/" + courseFee);
    }

    //Majors
    getMajors(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/majors");
    }

    newMajor(major): Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/majors/new", major);
    }

    updateMajor(major): Observable<any> {
        return this.httpclient.put("http://localhost:8000/api/majors/update", major);
    }

    deleteMajor(major): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/majors/delete/" + major);
    }

    //Colleges
    getColleges(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/colleges");
    }

    newCollege(college): Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/colleges/new", college);
    }

    updateColleges(college): Observable<any> {
        return this.httpclient.put("http://localhost:8000/api/colleges/update", college);
    }

    deleteCollege(college): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/colleges/delete/" + college);
    }

    //Sections
    getSections(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/sections");
    }

    newSection(section): Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/sections/new", section);
    }

    updateSection(section): Observable<any> {
        return this.httpclient.put("http://localhost:8000/api/sections/update", section);
    }

    deleteSection(section): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/sections/delete/" + section);
    }

    //School Years
    getSchoolYears(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/school-year");
    }

    newSchoolYear(sy): Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/school-year/new", sy);
    }

    updateSchoolYear(sy): Observable<any> {
        return this.httpclient.put("http://localhost:8000/api/school-year/update", sy);
    }

    deleteSchoolYear(sy): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/school-year/delete/" + sy);
    }

    //User management

    newUser(user): Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/user-management/new", user);
    }

    getUsers(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/user-management");
    }

    getUserTypes(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/user-types");
    }


    updateUserAccount(user): Observable<any> {
        return this.httpclient.put("http://localhost:8000/api/user-management/update", user);
    }

    deleteUserAccount(user): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/user-management/delete/" + user);
    }

    verifyLogin(login): Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/verify", login);
    }

    //School Years
    getSy(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/school-year");
    }

    //curriculums Years
    getCurriculums(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/curriculum");
    }

    newCurriculum(curriculum):Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/curriculum/new", curriculum);
    }

    deleteCurriculum(curriculum): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/curriculum/delete/" + curriculum);
    }

    
    updateCurriculum(curriculum): Observable<any> {
        return this.httpclient.put("http://localhost:8000/api/curriculum/update", curriculum);
    }

    getCurriculumView(id): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/curriculum/report/" + id);
    }

    newCurriculumSubject(curr_subject):Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/curriculum-subjects/new", curr_subject);
    }

    updateCurriculumSubject(subject):Observable<any> {
        return this.httpclient.put("http://localhost:8000/api/curriculum-subjects/update", subject);
    }

    deleteCurriculumSubject(curr_subject): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/curriculum-subjects/delete/" + curr_subject);
    }

    getScheduleSubjects(schedule): Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/schedules/subjects/" , schedule);
    }

    getScheduleSemesters(id): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/schedules/semesters/" + id);
    }

    getScheduleInfo(id): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/schedules/" + id);
    }

    newScheduleSubject(schedule):Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/schedules-subjects/new", schedule);
    }

    updateScheduleSubject(schedule):Observable<any> {
        return this.httpclient.put("http://localhost:8000/api/schedules-subjects/update", schedule);
    }

    deleteScheduleSubject(id): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/schedules-subjects/delete/" + id);
    }

    //Enrolled SUbjects
    newSubjectEnrollment(subject):Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/enrolled-subjects/new", subject);
    }

    updateGrades(enrollmentData):Observable<any> {
        return this.httpclient.put("http://localhost:8000/api/enrolled-subjects/update", enrollmentData);
    }

    getEnrollmentAssesment(id): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/enrollment/assesment/" + id);
    }

    //notes
    getNotes(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/notes");
    }

    newNote(notes): Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/notes/new", notes);
    }

    updateNote(notes): Observable<any> {
        return this.httpclient.put("http://localhost:8000/api/notes/update", notes);
    }

    deleteNote(notes): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/notes/delete/" + notes);
    }

    //prerequisites
    newPrereq(subject): Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/prerequisites/new", subject);
    }

    deletePrerequisite(prereq_id): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/prerequisites/delete/" + prereq_id);
    }

    //curriculum subject
    getCurriculumSubject(curr_sub_id): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/curriculum-subjects/" + curr_sub_id );
    }

    //Charts
    getSemEnrollmentsBySy(sy_id): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/enrollments/reports/chart_one/" + sy_id );
    }

    getChartTwoData(course_id): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/enrollments/reports/chart_two/" + course_id );
    }

    getChartThreeData(year): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/enrollments/reports/chart_three/" + year );
    }

    
    getChartFourData(id): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/enrollments/reports/chart_four/" + id );
    }

    getChartFiveData(id): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/enrollments/reports/chart_five/" + id);
    }

    //Signatories

    getSignatoryTypes(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/signatory-type");
    }

    newSignatoryType(type): Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/signatory-type/new", type);
    }

    deleteSignatoryType(id): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/signatory-type/delete/" + id);
    }

    updateSignatoryType(type): Observable<any> {
        return this.httpclient.put("http://localhost:8000/api/signatory-type/update", type);
    }

    newSignatory(type): Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/signatories/new", type);
    }

    deleteSignatory(id): Observable<any> {
        return this.httpclient.delete("http://localhost:8000/api/signatories/delete/" + id);
    }

    updateSignatory(type): Observable<any> {
        return this.httpclient.put("http://localhost:8000/api/signatories/update", type);
    }

    
    getSignatories(): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/signatories");
    }

    //Reports
    getGradeSheet(id): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/reports/grade-sheet/" + id);
    }

    getCertificateOfEnrollment(id): Observable<any> {
        return this.httpclient.get("http://localhost:8000/api/reports/certificate-of-enrollment/" + id);
    }

    getListOfGrades(filter): Observable<any> {
        return this.httpclient.post("http://localhost:8000/api/reports/list-of-grades/" ,filter);
    }
}