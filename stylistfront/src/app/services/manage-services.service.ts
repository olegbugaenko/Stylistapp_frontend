import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ManageServicesService {

  constructor(private http:HttpClient) { }

  attemptGetServices(){
	return this.http.get("http://localhost/lara_app/my-services");	
  }

  attemptSaveService(service_data){
	return this.http.post("http://localhost/lara_app/update_userservice",service_data);	
  }

  attemptGetAvailableServices(){
  	return this.http.get("http://localhost/lara_app/available-services");
  }

  attemptGetSetupStage(){
  	return this.http.get("http://localhost/lara_app/my-guide");
  }

}
