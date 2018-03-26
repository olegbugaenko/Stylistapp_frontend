import { Component, OnInit } from '@angular/core';
import { ManageAvailabilityService } from './../../../services/manage-availability.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {

  constructor( private availabilityService: ManageAvailabilityService) {}

  availabilities = [];

  dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

  hoursAvail = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];

  success_message = "";

  error_message ="";

  ngOnInit() {
  	for(var i=0;i<7;i++)
  	{
  		this.availabilities.push({'from':9,'to':18,'is_free':0,'title':this.dayNames[i]});
  	}

  	this.availabilityService.attemptGetAvailability().subscribe((resp)=>{
  		for(var availability_day of resp)
  		{
  			if('day_id' in availability_day && availability_day['day_id']<7)
  			{
  				let day_id = availability_day['day_id'];

  				this.availabilities[day_id] = {
  					'from':availability_day['from'],
  					'to':availability_day['to'],
  					'is_free':availability_day['is_free'],
  					'title':this.dayNames[day_id]
  				}
  			}
  		}
  	})
  }

  saveAvailabilities(){
  	var data_save = {
  		from:	 [],
  		to:		 [],
  		is_free: []
  	}

  	for(var i=0;i<7;i++)
  	{
  		data_save['from'][i] = this.availabilities[i].from;
  		data_save['to'][i] = this.availabilities[i].to;
  		data_save['is_free'][i] = this.availabilities[i].is_free;
  		
  	}

  	this.availabilityService.attemptSaveAvailability(data_save).subscribe((resp)=>{
  		if(resp['success'] == true)
  		{
  			this.success_message = "Your availability was saved successfull";
  			this.error_message = "";
  		}
  		else
  		{
  			this.success_message = "";
  			this.error_message = "Sorry, unexpected error occured.";
  		}
  	})
  }

}
