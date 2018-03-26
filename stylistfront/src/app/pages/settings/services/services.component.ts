import { Component, OnInit } from '@angular/core';
import { ManageServicesService } from './../../../services/manage-services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  providers: [ManageServicesService]
})

export class ServicesComponent implements OnInit {

  constructor(private serviceManager: ManageServicesService) { }

  services = null;

  ngOnInit() {
    this.serviceManager.attemptGetServices().subscribe((resp) => {
    	if('services' in resp)
    	{
    		this.services = [];
    		for(var service of resp['services'])
    		{
    			service.editing = false;
    			this.services.push(service);
    		}
    	}
    	else
    	{
    		this.services = [];
    	}

    	console.log(resp['services']);
    })
  }

  editService(index){
  	if(this.services[index])
  	{
  		this.services[index].editing = true;
  	}
  }


  saveService(index){
  	if(this.services[index])
  	{
  		var saved_data = this.services[index].pivot;
  		this.serviceManager.attemptSaveService(saved_data).subscribe((result)=>{
  			console.log(result);
  			this.services[index].editing = false;
  		})
  		
  	}
  }

}
