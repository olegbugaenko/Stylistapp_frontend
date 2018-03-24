import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './../../services/user.auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './registration-component.component.html',
  styleUrls: ['./registration-component.component.css'],
  providers: [UserAuthService]
})
export class RegistrationComponent implements OnInit {

  user_data = {
  	name: '',
  	second_name: '',
  	email: '',
  	phonenumber: '',
  	password: '',
  	password_confirmation: '',
  	salon_name: '',
  	salon_address: ''
  }

  constructor(private userAuthService: UserAuthService, router: Router) { }

  ngOnInit() {
  }

  onRegister() {
  	this.userAuthService.attemptRegister(this.user_data).subscribe((resp) => {
  	  console.log(resp);
  	})
  }

}
