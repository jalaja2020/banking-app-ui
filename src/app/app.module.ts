import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { ErrorpathComponent } from './errorpath/errorpath.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { ApiService } from './dataService/api.service';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { TransDetailsComponent } from './trans-details/trans-details.component';
import { BenfibeneficiaryComponent } from './benfibeneficiary/benfibeneficiary.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountSummaryComponent,
    LogoutComponent,
    ErrorpathComponent,
    UserloginComponent,
    FundTransferComponent,
    TransDetailsComponent,
    BenfibeneficiaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
