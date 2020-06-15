import { Component, OnInit } from '@angular/core';
import { ApiService } from '../dataService/api.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.css']
})
/**
 * @description Login successful show account summary of logined user.
 */

export class AccountSummaryComponent implements OnInit {
  userId: string = '';
  baseurl: string = `${environment.baseUrl}/accounts`;
  accountSummaryUrl: string = "";
  baseTransUrl: string = `${environment.baseUrl}/transHistory`;
  transUrl:string='';
  accountBalance: number = 0;
  accountNumber: string = "";
  transFlag: boolean = false;
  selectedTransData: Array<any> = [];
  getTransData: any;

  constructor(private apiservice: ApiService,
    private route: Router) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userid");
    this.accountSummaryUrl = `${this.baseurl}?userId=${this.userId}`;
    console.log(this.accountSummaryUrl);

    this.apiservice.getData(this.accountSummaryUrl).subscribe(
      (response) => {
        this.accountBalance = Number(response[0].accountBalance);
        this.accountNumber = response[0].accountId;
        localStorage.setItem("acccountNumber", this.accountNumber);
      }, (error) => {
        alert("account summary failed");
        console.log(error);
      }, () => {
      })
  }
  /**
  * @description Display transaction details
  */
  transDetails = () => {
    console.log("transaction details url :" + this.baseTransUrl);
    this.transUrl = `${this.baseTransUrl}?userId=${this.userId}`;
    this.getTransData = this.apiservice.getData(this.transUrl).subscribe((response) => {
      console.log('transaction -> GetData response: ', response);
      if (response !== undefined && response.length > 0) {
        this.selectedTransData = response;
      } else {
        alert('transaction details not available for the user');
      }
    }, (error) => {
      alert(`transaction : fail with error: ${error}`);
    }, () => {
    });
  }
}
