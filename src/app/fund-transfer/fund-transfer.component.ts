import { Component, OnInit } from '@angular/core';
import { ApiService } from '../dataService/api.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css']
})
export class FundTransferComponent implements OnInit {
  userId: string = '';
  baseurl: string = `${environment.baseUrl}/beneficiaryAcc`;
  baseAccountsUrl: string = `${environment.baseUrl}/accounts`;
  baseTransHistoryUrl: string = `${environment.baseUrl}/transHistory`;
  balanceCheckUrl: string = '';
  beneficiaryUrl: string = "";
  balance: number = 0;
  beneficiaryInfo: Array<any> = [];
  accountsInfo: Array<any> = [];
  getBenefAccData: any;
  getAccountsData: any;
  updateFromAccTxnData: any;
  transData: any;
  benificaryId: string = '';
  fromAccountId: string = '';
  createTransData: any;
  model: any = {
    fromAccountId: '',
    benificaryId: '',
    amount: 0
  }
  submitted: boolean = false;

  constructor(private apiservice: ApiService,
    private route: Router) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userid");
    this.beneficiaryUrl = `${this.baseurl}?userId=${this.userId}`;
    console.log(this.beneficiaryUrl);
    this.getBenefAccData = this.apiservice.getData(this.beneficiaryUrl).subscribe((response) => {
      console.log('beneficiary -> GetData response: ', response);
      if (response !== undefined && response.length > 0) {
        this.beneficiaryInfo = response;
        this.model.fromAccountId = this.beneficiaryInfo[0].fromAccountId;
        console.log(this.beneficiaryInfo);
      } else {
        alert('Beneficiaries not available for the user');
      }
    }, (error) => {
      alert(`Beneficiaries : fail with error: ${error}`);
    }, () => {

    });
  }
/**
 * @description Fund transfer to respected users
 * @param fundTranRef 
 */
  submit = (fundTranRef) => {
    console.log(fundTranRef.valid);
    this.submitted = true;
    if (fundTranRef.valid) {
      console.log(fundTranRef.amount);
      console.log("benficiary accountid" + fundTranRef.fromAccountId);
      this.benificaryId = this.model.benificaryId;
      this.fromAccountId = this.model.fromAccountId;
      this.balanceChekDetails(this.model.amount);
      this.beneficiaryBalCheckDetails(this.model.amount);
      
    } else {
      alert("fund transfer failed");
    }
  }
  /**
   * @description balance check , update  beneficiary details
   * @param amount 
   * @param benificaryId 
   */
  beneficiaryBalCheckDetails = (amount) => {

    console.log("amount, benificaryId" + amount + "=>" + this.benificaryId);
    this.balanceCheckUrl = `${this.baseAccountsUrl}?accountId=${this.benificaryId}`;
    this.getAccountsData = this.apiservice.getData(this.balanceCheckUrl).subscribe((response) => {
      console.log('accounts -> GetData response: ', response);
      if (response !== undefined && response.length > 0) {
        this.accountsInfo = response;
        this.accountsInfo[0].accountBalance = (Number(response[0].accountBalance) + Number(amount)).toString();
        alert("beneficiary user id"+response[0].userId);
        
        this.accountsInfo[0].userId=response[0].userId;
        console.log("beneficary details");
        this.updateAccountDetails(this.baseAccountsUrl, this.accountsInfo, response[0].id);
        this.createTransactionHistory('credit', this.fromAccountId, this.benificaryId,this.accountsInfo[0].userId,amount);
        alert("fund transfer successful");
      } else {
        alert('accounts not available for the user');
      }
    }, (error) => {
      alert(`accounts: fail with error: ${error}`);
    }, () => {

    });
  }
  /**
   * @description balance check ,update user account details
   * @param amount 
   */
  balanceChekDetails = (amount) => {
    console.log(amount);
    this.balanceCheckUrl = `${this.baseAccountsUrl}?userId=${this.userId}`;
    this.getAccountsData = this.apiservice.getData(this.balanceCheckUrl).subscribe((response) => {
      console.log('accounts -> GetData response: ', response);
      if (response !== undefined && response.length > 0) {
        this.accountsInfo = response;
        this.accountsInfo[0].accountBalance = (Number(response[0].accountBalance) - Number(amount)).toString();
        if (this.accountsInfo[0].accountBalance < 500) {
          alert("insufficent funds");
        } else {
          console.log(this.accountsInfo[0].accountId);
          console.log(this.accountsInfo.length);
          console.log(response[0].id);
          this.updateAccountDetails(this.baseAccountsUrl, this.accountsInfo, response[0].id);
          this.createTransactionHistory('debit', this.fromAccountId, this.benificaryId,this.userId,amount);
        }
      } else {
        alert('accounts not available for the user');
      }
    }, (error) => {
      alert(`accounts: fail with error: ${error}`);
    }, () => {

    });
  }
  /**
   * @description update from account details
   * @param url
   * @param accountsInfo 
   * @param id 
   */
  updateAccountDetails = (url, accountsInfo, id) => {
    let account = {
      accountId: accountsInfo[0].accountId,
      accountName: accountsInfo[0].accountName,
      accountBalance: accountsInfo[0].accountBalance,
      userId: accountsInfo[0].userId,
      id: Number(accountsInfo[0].id)
    }
    this.updateFromAccTxnData = this.apiservice.updateData(`${url}/${id}`, account).subscribe((response) => {
      console.log('accounts -> updateData response: ', response);
    }, (error) => {
      alert(` accounts: update fail with error: ${error}`);
    }, () => {
    });
  }
/**
 * @description log transaction details  for credit and debit transactions
 * @param transTye 
 * @param fromAccId 
 * @param toAccId 
 */
  createTransactionHistory = (transTye, fromAccId, toAccId,userId,amount) => {
    let transData = {
      userId: userId,
      beneficiaryId: toAccId,
      fromAccountId: fromAccId,
      transType: transTye,
      transDate: new Date(),
    }
    console.log("transaction details : " + transData);
    this.createTransData = this.apiservice.postData(this.baseTransHistoryUrl, transData).subscribe(
      (response) => {
        console.log('accounts -> transactionhistory response: ', response);
      }, (error) => {
        alert(` accounts: tramsaction history fail with error: ${error}`);
      }, () => {
      });
  }
}

