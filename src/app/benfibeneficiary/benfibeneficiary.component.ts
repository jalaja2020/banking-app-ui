import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ApiService } from '../dataService/api.service';

@Component({
  selector: 'app-benfibeneficiary',
  templateUrl: './benfibeneficiary.component.html',
  styleUrls: ['./benfibeneficiary.component.css']
})
/**
 * @description add beneficiary details and validations for fields
 */
export class BenfibeneficiaryComponent implements OnInit {
  model: any = {
    userId: '',
    beneficiaryId: '',
    fromAccountId: '',
    ifscCode: '',
    bankName: ''
  }
  submitted: boolean = false;
  baseurl: string = `${environment.baseUrl}/beneficiaryAcc`;
  loginurl: string = '';
  createBenficiaryData: any;
  constructor(private apiservice: ApiService,
    private route: Router) { }

  ngOnInit(): void {
   this.model.fromAccountId=localStorage.getItem("acccountNumber");
   this.model.userId=localStorage.getItem("userid");
  }
  /**
 * @description Add beneficiary details 
 */
  submit = (beneficiaryRef) => {
    console.log(beneficiaryRef.valid);
    this.submitted = true;
    if (beneficiaryRef.valid) {
      console.log(this.model);
      debugger
      this.createBenficiaryData = this.apiservice.postData(this.baseurl, this.model).subscribe(
        (response) => {
          console.log('benficiary -> Benficiary response: ', response);
        }, (error) => {
          alert(` BenficiaryData: BenficiaryData fail with error: ${error}`);
        }, () => {
        });
    }
  }
}
