import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginRouteGuard implements CanActivate {

  constructor(private http:HttpClient, private router: Router) {}

  checkAuthorized(){
		return this.http.get("http://localhost/lara_app/check_auth");
	}


  canActivate():Observable<boolean> {
    return this.checkAuthorized().map((resp)=>{
    	if('user' in resp)
    	{
    		sessionStorage.setItem('current_user',JSON.stringify(resp['user']));

    		return true;
    	}
    	else
    	{
    		sessionStorage.removeItem('current_user');
    		this.router.navigate(['/login']);
    		return false;
    	}
    });
  }
}