import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ApiService } from '../dataService/api.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
/**
 * @description user login and validating user if user successful login naviga
 */
export class UserloginComponent implements OnInit {
  model: any = {
    useremail: '',
    password: ''
  }
  submitted: boolean = false;
  baseurl: string = `${environment.baseUrl}/users`;
  loginurl: string = '';
  constructor(private apiservice: ApiService,
    private route: Router)  { }

  ngOnInit(): void {
  }

/**
 * @description  user logout details
 */
submit = (loginRef) => {
  console.log(loginRef.valid);
  this.submitted = true;
  if (loginRef.valid) {
    
    this.loginurl = `${this.baseurl}?useremail=${this.model.useremail}&password=${this.model.password}`;
    alert(this.loginurl);
    this.apiservice.getData(this.loginurl).subscribe(
      (response) => {
        alert("login successful");
        localStorage.setItem("userid",response[0].userId);
        this.route.navigate(["/account"]);
      }, (error) => {
        alert("login failed");
        console.log(error);
      }, () => {
      })
  } else {
    alert("login failed");
  }
}

}
