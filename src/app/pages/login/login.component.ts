import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { requestService } from 'src/app/services/request.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private _requestService: requestService,private snackBar: MatSnackBar) { }

  login_flag: string = localStorage.getItem("login_flag");

  ngOnInit() {
    if(this.login_flag == "1"){
      this.router.navigate([""]);
    }
  }

  Login(form : NgForm) {
    
    console.log(form.value);
    this._requestService.verifyLogin(form.value)
    .subscribe
    (
      result => {
        console.log(result);
        if(result != "Invalid"){
          console.log("Info" + result);
          localStorage.setItem("login_flag", "1"); 
          localStorage.setItem("user_id", result.uac_id);
          localStorage.setItem("uac_fullname", result.uac_fullname);
          localStorage.setItem("uac_type", result.uac_type);
          localStorage.setItem("uac_name", result.uac_name);
          localStorage.setItem("uac_pword", result.uac_pword);
          localStorage.setItem("del_flag", result.del_flag);
          localStorage.setItem("uac_type_desc", result.uac_type_desc);

          this.router.navigate(['']);
        }else{
          this.openSnackBar("Invalid Login","");
        }
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
