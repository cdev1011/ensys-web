import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterModule, Routes, ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  constructor(private breakpointObserver: BreakpointObserver,private router: Router) {}
  
  login_flag: string = localStorage.getItem("login_flag");
  username: string = localStorage.getItem("uac_name");

  ngOnInit() {

    if(this.login_flag == "0" || this.login_flag == null){
      this.router.navigate(["login"]);
    }else{
      this.router.navigate(["/dashboard"]);
      console.log(this.login_flag);
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

    selectedItem($event){
      if($event.label == "Exit"){

        localStorage.setItem("login_flag", "0"); 
        localStorage.removeItem("user_id");
        localStorage.removeItem("uac_type");
        localStorage.removeItem("uac_name");
        localStorage.removeItem("uac_pword"); 
        localStorage.removeItem("uac_fullname");
        localStorage.removeItem("del_flag");
        localStorage.removeItem("uac_type_desc");

        this.router.navigate(["login"]);

      }else  if($event.label == "Students"){
        this.router.navigate([$event.link], { queryParams: { flag: 0 } });
      }
      else  if($event.label == "Transferee/Shifter"){
        this.router.navigate([$event.link], { queryParams: { flag: 1 } });
      }
      else{
        this.router.navigate([$event.link]);
        console.log($event.link);
      }
    }

    config = {
      paddingAtStart: true,
      // classname: 'my-custom-class',
      // listBackgroundColor: 'rgb(208, 241, 239)',
      fontColor: 'rgb(255, 255, 255)',
      // backgroundColor: 'rgb(208, 241, 239)',
      selectedListFontColor: 'white',
    };

    appitems = [
      {
        label: 'Dashboard',
        link: '/dashboard',
        icon: 'offline_pin'
      },
      {
        label: 'Transaction',
        icon: 'swap_horiz',
        items: [
          {
            label: 'Enrollment',
            icon: 'assignment',
            items: [
              {
                label: 'Student Profile',
                icon: 'account_box',
                link: '/student-list',
              },
              {
                label: "Student's Registration",
                icon: 'class',
                link: '/enrollment-form',
              }
            ]
          },
          {
            label: 'Grades',
            icon: 'grade',
            items: [
              {
                label: 'Students',
                link: '/student-grading',
              },
              {
                label: 'Transferee/Shifter',
                link: '/student-grading',
              }
            ]
          },
          {
            label: 'Accounts',
            icon: 'supervisor_account',
            items: [
              {
                label: 'Assesment Breakdown',
                link: '/accounts/assesment',
                icon: 'folder',
              }
            ]
          },
        ],
        
      },
      {
        label: 'Set-up',
        icon: 'settings_applications',
        items: [
          {
            label: 'General',
            link: 'manage',
            icon: 'folder',
          },
          {
            label: 'User Management',
            link: 'user-management',
            icon: 'supervised_user_circle'
          },
          {
            label: 'Exit',
            link: '/item-2-2',
            icon: 'exit_to_app'
          },
        ]
      },
      {
        label: 'Reports',
        icon: 'bar_chart',
        items: [
          {
            label: 'Grade Sheets',  
            link: '/reports/grade-sheet',
            icon: 'schedule'
          },
          {
            label: 'Certificate of Enrollments',
            link: '/reports/certificate-of-enrollment',
            icon: 'schedule'
          },
          {
            label: 'Enrollment List',
            link: '',
            icon: 'schedule'
          },
          {
            label: 'List Of Grades',
            link: '/reports/list-of-grades',
            icon: 'schedule'
          },
          {
            label: 'Certificate Of Grades',
            link: '',
            icon: 'schedule'
          },
          {
            label: 'TOR',
            link: '',
            icon: 'schedule'
          },
          {
            label: 'NSTP',
            link: '',
            icon: 'schedule'
          },
          {
            label: 'Evaluation',
            link: '',
            icon: 'schedule'
          }
        ]
      },
      {
        label: 'Help',
        link: '/item-4',
        icon: 'help',
      }
    ];
}
