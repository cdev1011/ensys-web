import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';
import { requestService } from 'src/app/services/request.service';
import * as Chart from 'chart.js';
import { MatDialog } from '@angular/material';
import { AddCourseFormComponent } from 'src/app/forms/courses/add-course-form/add-course-form.component';
import { ChartCourseSelectionComponent } from 'src/app/dialogs/chart-course-selection/chart-course-selection.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Chart settings
  chartCourseId: any;
  chartCourseDesc: any;

  school_years = [];
  courses = [];
  years = [];

  ChartOneData: any;
  ChartOne: any;

  ChartTwoData: any;
  ChartTwo: any;

  ChartThreeData: any;
  ChartThree: any;

  chartOneSelection: any;
  chartTwoSelection: any;
  chartThreeSelection: any;

  constructor(private _requestService: requestService,public dialog: MatDialog) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
  }

  fetchSchoolyears() {
    this._requestService.getSchoolYears()
      .subscribe
      (
        data => {
          this.school_years = data.data;
        }
      )
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


  //Functions for populating charts starts here

  populateChartOne(semesterId) {

    this._requestService.getSemEnrollmentsBySy(semesterId)
      .subscribe
      (
        data => {

          var newLabels = [];
          var newData = [];
          for (var i = 0; i < data.length; i++) {
            newLabels.push(data[i].semester_desc);
            newData.push(data[i].Enrollments);
          }

          this.ChartOneData = {
            datasets: [{
              data: newData,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
              ],
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
            }],
            labels: newLabels
          };

          //var ctx2 = document.getElementById('ChartOne').getContext('2d');
          var ctx2 = "ChartOne";
          if (this.ChartOne) {
            this.ChartOne.destroy();
          }

          this.ChartOne = new Chart(ctx2, {
            type: 'bar',
            data: this.ChartOneData,
            options: {
              responsive: true, showLines: true, scales: {
                yAxes: [{
                  stacked: true
                }]
              }
            }
          });
        }
      )
  }

  populateChartTwo(semesterId) {

    this._requestService.getChartTwoData(semesterId)
      .subscribe
      (
        data => {

          var newLabels = [];
          var newData = [];
          for (var i = 0; i < data.length; i++) {
            newLabels.push(data[i].gender);
            newData.push(data[i].enrollees);
          }

          this.ChartTwoData = {
            datasets: [{
              data: newData,
              borderColor: 'black',
              backgroundColor: '#74b9ff',

            }],
            labels: newLabels
          };

          //var ctx2 = document.getElementById('ChartTwo').getContext('2d');
          var ctx2 = 'ChartTwo';

          if (this.ChartTwo) {
            this.ChartTwo.destroy();
          }

          this.ChartTwo = new Chart(ctx2, {
            type: 'bar',
            data: this.ChartTwoData,
            options: {
              responsive: true, showLines: true, scales: {
                yAxes: [{
                  stacked: true
                }]
              }
            }
          });
        }
      )
  }

  populateChartThree(year) {

    this._requestService.getChartThreeData(year)
      .subscribe
      (
        data => {

          var newLabels = [];
          var newData = [];
          for (var i = 0; i < data.length; i++) {
            newLabels.push(data[i].month);
            newData.push(data[i].enrollees);
          }

          this.ChartThreeData = {
            datasets: [{
              data: newData,
              borderColor: 'black',
              backgroundColor: '#74b9ff',
              label: "Enrollments"
            }],
            labels: newLabels,
          };

          ///var ctx2 = document.getElementById('ChartThree').getContext('2d');
          var ctx2 = "ChartThree";
          if (this.ChartThree) {
            this.ChartThree.destroy();
          }

          this.ChartThree = new Chart(ctx2, {
            type: 'bar',
            data: this.ChartThreeData,
            options: {
              responsive: true, maintainAspectRatio: false, showLines: true, scales: {
                yAxes: [{
                  stacked: true
                }]
              }
            }
          });
        }
      )
  }

  onResize() {
    // if(this.ChartOne){
    //   this.ChartOne.resize();
    //   this.ChartOne.render(true);
    // }

    // if(this.ChartTwo){
    //   this.ChartTwo.resize();
    //   this.ChartTwo.render(true);
    // }
  }

  populateYears() {
    var currentYear = (new Date()).getFullYear();
    for (var i = 2000; i <= currentYear; i++) {
      this.years.push(i);
    }
  }

  getSemesters() {
    this._requestService.getSemesters()
      .subscribe
      (
        data => {
          this.semesters = data.data;
        }
      )
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  semChanged(event) {
    console.log(event);
    this.populateChartOne(event.value);
  }

  chartTwoChanged(event) {
    this.populateChartTwo(event.value);
  }

  chartThreeChanged(event) {
    this.populateChartThree(event.value)
  }

  getChartOneLabel() {
    return this.chartOneSelection;
  }

  getChartTwoLabel() {
    return this.chartTwoSelection;
  }

  getChartThreeLabel() {
    return this.chartThreeSelection;
  }

  ngAfterViewInit() {
    console.log("loading chart");
    this.populateYears();
    this.fetchCourses();
    this.fetchSchoolyears();

    //Reports
    this.chartCourseId = 0; //default settings
    this.populateChartFour();
    this.populateChartFive();

    this.chartOneSelection = "Enrollments Per Semester";
    this.chartTwoSelection = "Course Enrollments";
    this.chartThreeSelection = "Enrollments By Year";
  }


  ChartFourData: any;
  ChartFour: any;

  ChartFiveData: any;
  ChartFive: any;

  schoolYearLbls: string[] = [];
  semesters: any;
  enrollments: any;

  populateChartFive() {
    console.log("Basis for charts: " + this.chartCourseId);
    this._requestService.getChartFiveData(this.chartCourseId) //we need to add the course restriction
      .subscribe
      (
        data => {
          this.enrollments = data.chart_data;
          var DataItem = [];
          //Loop through all data
          for (var i = 0; i < this.enrollments.length; i++) {

            var obj = {
              label: this.enrollments[i].label,
              backgroundColor: this.getRandomColor(),
              data: this.enrollments[i].data
            };

            DataItem.push(obj);
          }


          this.ChartFiveData = {
            datasets: DataItem,
            labels: data.chart_labels
          };

          //var ctx2 = document.getElementById('ChartTwo').getContext('2d');
          var ctx2 = 'ChartFive';

          if (this.ChartFive) {
            this.ChartFive.destroy();
          }

          this.ChartFive = new Chart(ctx2, {
            type: 'bar',
            data: this.ChartFiveData,
            options: {
              legend: {
                labels: {
                  // This more specific font property overrides the global property
                  fontSize: 15
                }
              },
              tooltips: {
                titleFontSize: 15,
                bodyFontSize: 15
              },
              responsive: true, maintainAspectRatio: false,
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                    callback: function (value) { if (value % 1 === 0) { return value; } },
                    min: 0,
                    fontSize: 15
                  }
                }]
              }
            }
          });

        }
      )
  }

  populateChartFour() {

    console.log("Basis for charts: " + this.chartCourseId);
    this._requestService.getChartFourData(this.chartCourseId)
      .subscribe
      (
        data => {
          this.enrollments = data.chart_data;
          var DataItem = [];
          //Loop through all data
          for (var i = 0; i < this.enrollments.length; i++) {

            var obj = {
              label: this.enrollments[i].label,
              backgroundColor: this.getRandomColor(),
              data: this.enrollments[i].data
            };

            DataItem.push(obj);
          }


          this.ChartFourData = {
            datasets: DataItem,
            labels: data.chart_labels
          };

          //var ctx2 = document.getElementById('ChartTwo').getContext('2d');
          var ctx2 = 'ChartFour';

          if (this.ChartFour) {
            this.ChartFour.destroy();
          }

          this.ChartFour = new Chart(ctx2, {
            type: 'bar',
            data: this.ChartFourData,
            options: {
              legend: {
                labels: {
                  // This more specific font property overrides the global property
                  fontSize: 15
                }
              },
              tooltips: {
                titleFontSize: 15,
                bodyFontSize: 15
              },
              responsive: true, maintainAspectRatio: false,
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                    callback: function (value) { if (value % 1 === 0) { return value; } },
                    min: 0,
                    fontSize: 15
                  }
                }]
              }
            }
          });

        }
      )
  }

  changeChartBasis(){
    this.dialog.open(ChartCourseSelectionComponent).afterClosed()
    .subscribe(result => {
      //reload charts based on this course
      console.log("New settings detected: " + result.course_id);
      this.chartCourseId = result.course_id;
      this.chartCourseDesc = result.course_desc;
      
      //Reports
      this.populateChartFour();
      this.populateChartFive();
    });;
  }

  getEnrollmentBasis(){
    return this.chartCourseDesc;
  }

}
