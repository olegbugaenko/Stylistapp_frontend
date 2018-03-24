import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import decode from 'jwt-decode';
import { Observable } from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class UserAuthService{

	constructor(private http:HttpClient){

	}

	getToken() {
	  return sessionStorage.getItem('token');
    }

	getUsers(){
		return this.http.get("http://localhost/lara_app/list");
	}

	private currentUserSource = new ReplaySubject(null);
	
	currentUser = this.currentUserSource.asObservable();

	users = [
	{
		'name':'test1',
		'email':'email1'
	},
	{
		'name':'test2',
		'email':'email2'
	}]

	attemptLogin(phonenumber, password){
		return this.http.post("http://localhost/lara_app/login",{'phonenumber':phonenumber,'password':password});	
	}

	attemptRegister(user_data){
		return this.http.post("http://localhost/lara_app/register",user_data);	
	}

	setLoggedData(data)	{
		this.currentUserSource.next(data);
	}

	attemptRecieveUser(){
		if(!this.getToken())
		{
			return;
		}

		var self = this;

		let resp = this.http.get("http://localhost/lara_app/check_auth").subscribe((resp)=>{
			
			if('user' in resp)
				this.setLoggedData(resp['user']);
			
		});
		
		return resp;
	}

	attemptLogout(){
		sessionStorage.removeItem('token');
		console.log('loging out');
		this.setLoggedData(null);
		
		return {'status':'ok'};
	}


}