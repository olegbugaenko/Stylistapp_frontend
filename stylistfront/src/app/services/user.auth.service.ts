import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import decode from 'jwt-decode';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserAuthService{

	constructor(private http:HttpClient){

	}

	/*	getToken()	-	checks if token is present is session storage. 
			return	- 	TRUE, if token is set
				   		FALSE, once not
	*/

	getToken() {
	  return sessionStorage.getItem('token');
    }

	private currentUserSource = new BehaviorSubject(null);


	
	currentUser = this.currentUserSource.asObservable();

	/*	attemptLogin(phonenumber, password) - send query to authorize user by phonenumber and password, passed in corresponding parameters
			return	- JSON string with token, once authorization succeeded
					- JSON string with error, once not
	*/

	attemptLogin(phonenumber, password){
		return this.http.post("http://localhost/lara_app/login",{'phonenumber':phonenumber,'password':password});	
	}

	/*	attemptRegister(user_data) - send query to register user with data, passed to user_data object
			return	- JSON string with registered user information, once registration succeeded
					- JSON string with error object, including corresponding validation errors
	*/

	attemptRegister(user_data){
		return this.http.post("http://localhost/lara_app/register",user_data);	
	}

	/*	setLoggedData(data) - store currently logged user data to session storage and observable varriable, so that subscribed
	 		components can use it
			
			return	nothing;
	*/

	setLoggedData(data)	{
		if(data)
			sessionStorage.setItem('current_user',JSON.stringify(data));
		else
			sessionStorage.removeItem('current_user');

		this.currentUserSource.next(data);
	}

	/*	syncLoggedDataFromSession() - store data to observable from session storage in order to minimize API queries count.
			return	object with obtained data;
	*/

	syncLoggedDataFromSession()
	{
		let data = sessionStorage.getItem('current_user');
		this.currentUserSource.next(JSON.parse(data));
		return data;
	}

	/*	attemptRecieveUser() - looking for currently authorized user data;
	*/

	attemptRecieveUser(){

		//Check if authorization token is present in session storage
		//if not - user is logged out, so reseting corresponding observable varriables 
		
		if(!this.getToken())
		{
			this.setLoggedData(null);
			return;
		}

		//Trying to get user data from session. If succeeded - it doesnt make sense to do another server API call
		if(sessionStorage.getItem('current_user'))
		{
			this.syncLoggedDataFromSession();
			return;
		}
		
		//If we failed to obtain user data from session storage - we should get data from server.
		let resp = this.http.get("http://localhost/lara_app/check_auth").subscribe((resp)=>{
			
			if('user' in resp)
				this.setLoggedData(resp['user']);
			else
				this.setLoggedData(null);
			

		});


		
		return;
	}


	attemptLogout(){
		sessionStorage.removeItem('token');
		console.log('loging out');
		this.setLoggedData(null);
		
		return {'status':'ok'};
	}


}