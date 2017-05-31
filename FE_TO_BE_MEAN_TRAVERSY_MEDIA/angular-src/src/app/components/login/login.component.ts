import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {FlashMessagesService} from  'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  // user={
  // 	username:'',
  // 	password:''
  // }


  constructor(
  	private authService:AuthService,
  	private Router:Router,
  	private flashMessage:FlashMessagesService) { 
  }

  ngOnInit() {
  }

  onLoginSubmit(username, password){
  	const user={
  		username: this.username,
  		password: this.password
  	}
  	this.authService.loginUser(user).subscribe(data =>{
  		if(data.success){
  			 this.authService.storeUserData(data.token, data.user);
  			this.flashMessage.show("logged in successfully",
  			{
  				cssClass:'alert-success',
  				timeout: 5000
  			});
  			this.Router.navigate(['account'])
  		}else{
  			this.flashMessage.show(data.msg,
  			{
  				cssClass:'alert-danger',
  				timeout: 5000
  			});
  		}
  	})

  }

}
