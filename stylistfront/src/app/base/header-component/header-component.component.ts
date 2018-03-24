import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './../../services/user.auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-comp',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css'],
  providers: [ UserAuthService ]
})
export class HeaderComponent implements OnInit {
	
  constructor(private userAuthService: UserAuthService, private router: Router) {

  }

  current_user = null;

  ngOnInit() {
  
  	this.userAuthService.attemptRecieveUser();

  	this.userAuthService.currentUser.subscribe((user) => {
  		console.log('User');
  		console.log(user);
  		this.current_user = user;
  	})
  }

  onLogout() {
  	this.userAuthService.attemptLogout();
  	this.router.navigate(['/login']);
  	this.userAuthService.attemptRecieveUser();
  }

}
