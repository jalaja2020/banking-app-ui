import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorpathComponent } from './errorpath/errorpath.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { BenfibeneficiaryComponent } from './benfibeneficiary/benfibeneficiary.component';


const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"login",component:UserloginComponent},
  {path:"logout",component:LogoutComponent},
  {path:"account",component:AccountSummaryComponent},
  {path:"fundtransfer",component:FundTransferComponent},
  {path:"beneficiary",component:BenfibeneficiaryComponent},
  {path:'',redirectTo:'/login', pathMatch:'full'},
  {path:'**',component:ErrorpathComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
