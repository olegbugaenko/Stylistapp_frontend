import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ManageAvailabilityService {

  constructor(private http:HttpClient) { }

  attemptGetAvailability(){
	return this.http.get("http://localhost/lara_app/availability");	
  }

  attemptSaveAvailability(availability_data){
	 return this.http.post("http://localhost/lara_app/update_availability",availability_data);	
  }

}
