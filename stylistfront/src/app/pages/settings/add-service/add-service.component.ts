import { Component, OnInit } from '@angular/core';
import { ManageServicesService } from './../../../services/manage-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  constructor(private serviceManager: ManageServicesService, private router:Router) { }

  available_services = [];

  found_services = [];

  service = {};

  service_name = '';

  ngOnInit() {
  	this.serviceManager.attemptGetAvailableServices().subscribe((resp)=>{
  		this.available_services = [];
  		for(var key in resp)
  		{
  			let service  = resp[key];
  			this.available_services.push(service);
  		}
  		
  	})
  }

  onAddService() {
  	this.serviceManager.attemptSaveService(this.service).subscribe((result)=>{
  			this.router.navigate(['/personal/services']);
  		})
  }

  isSearching = false;

  populateServices() {
  	let search_val = this.service_name;

  	this.found_services = [];

  	if(search_val && search_val.length > 2)
  	{
  		var imaxc = 0;

	  	for(var service of this.available_services)
	  	{
	  		if(imaxc>=10)
	  		{
	  			break;
	  		}

	  		if(service.service_name.indexOf(search_val) >= 0 )
	  		{
	  			this.found_services.push(service)
	  			imaxc++;
	  		}
	  		
	  	}

	  	this.isSearching = true;
	}
  }

  selectService(service_id, service_name){
  	this.service['service_id'] = service_id;
  	this.service_name = service_name;
  	this.isSearching = false;
  	this.found_services = [];
  }

  closePopulate(){
  	if(this.isSearching)
  	{
  		this.isSearching = false;
  		this.found_services = [];
  		this.service_name = '';
  	}
  }

}
