import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './../../services/user.auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
  providers: [UserAuthService]
})
export class LoginComponent implements OnInit {

  phonenumber;

  password;

  error;

  constructor(private userAuthService: UserAuthService, private router: Router) { }

  ngOnInit() {

  }

  onLogin() {
  	
  	this.userAuthService.attemptLogin(this.phonenumber, this.password).subscribe((resp) => {
  	  if('token' in resp)
  	  {
  	  	this.error = '';
  	  	sessionStorage.setItem('token',resp['token']);
  	  	this.userAuthService.attemptRecieveUser();

  	  	this.router.navigate(['/personal']);
  	  	window.location.reload();
  	  }
  	  else
  	  if('error' in resp)
  	  {
  	  	this.error = '<p class="error">Phonenumber or password was incorrect</p>';
  	  }
  	})
  }

}
