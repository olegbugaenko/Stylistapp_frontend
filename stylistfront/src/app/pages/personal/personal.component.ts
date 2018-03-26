import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './../../services/user.auth.service';
import { ManageServicesService } from './../../services/manage-services.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  constructor(private serviceManager: ManageServicesService, private userAuthService: UserAuthService) { }

  guide_stage = 0;

  current_user = {};

  ngOnInit() {

  	this.userAuthService.attemptRecieveUser();
  	
  	this.userAuthService.currentUser.subscribe((user) => {
  		console.log('Personal subscription worked');
  		this.current_user = user;
  		console.log(user);
  	});

  	this.serviceManager.attemptGetSetupStage().subscribe((resp)=>{
  		if('status' in resp && resp['status'] == 'guide')
  		{
  			this.guide_stage = resp['step'];
  		}
  	})
  }

}
