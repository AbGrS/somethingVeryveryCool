import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import 'hammerjs';

import {AuthService} from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { NavbarComponent } from './components/navbar/navbar.component';

import {AuthGuard} from './guards/auth.guard';
import { CreateAccountTvComponent } from './components/create-account-tv/create-account-tv.component';

// import { Overlay } from 'angular2-modal';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { DetailsComponent } from './components/details/details.component';
import { GroupsComponent } from './components/groups/groups.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AccountComponent,
    NavbarComponent,
    CreateAccountTvComponent,
    DetailsComponent,
    GroupsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlashMessagesModule,
    BootstrapModalModule,
     ModalModule.forRoot(),
   RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },{
        path: 'dashboard',
        component: DashboardComponent,
        canActivate:[AuthGuard]
      },{
        path: 'login',
        component: LoginComponent
      },{
        path: 'account',
        component: AccountComponent,
        canActivate:[AuthGuard]
      }
    ])
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
