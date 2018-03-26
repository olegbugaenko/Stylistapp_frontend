import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiHost} from "./../globals";

@Injectable()
export class ManageAvailabilityService {

  constructor(private http:HttpClient) { }

  attemptGetAvailability(){
	return this.http.get(ApiHost+"/availability");	
  }

  attemptSaveAvailability(availability_data){
	 return this.http.post(ApiHost+"/update_availability",availability_data);	
  }

}
