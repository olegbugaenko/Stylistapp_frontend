import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiHost} from "./../globals";

@Injectable()
export class ManageServicesService {

  constructor(private http:HttpClient) { }

  attemptGetServices(){
	return this.http.get(ApiHost+"/my-services");	
  }

  attemptSaveService(service_data){
	return this.http.post(ApiHost+"/update_userservice",service_data);	
  }

  attemptGetAvailableServices(){
  	return this.http.get(ApiHost+"/available-services");
  }

  attemptGetSetupStage(){
  	return this.http.get(ApiHost+"/my-guide");
  }

}
