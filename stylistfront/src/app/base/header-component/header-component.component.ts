import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { UserAuthService } from './../../services/user.auth.service';
import { Router, NavigationStart } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from "./../../services/window.service";

@Component({
  selector: 'app-header-comp',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css'],
  providers: [ UserAuthService ]
})
export class HeaderComponent implements OnInit {
	
  route_url = null;

  constructor(private userAuthService: UserAuthService, private router: Router, @Inject(WINDOW) private window: Window, @Inject(DOCUMENT) private document: Document) {
     
  }

  current_user = null;

  ngOnInit() {
  
  	this.userAuthService.attemptRecieveUser();

  	this.userAuthService.currentUser.subscribe((user) => {
      console.log('subscription worked');
      console.log(user);
  		this.current_user = user;
      
    })
  }

  onLogout() {
  	this.userAuthService.attemptLogout();
  	this.router.navigate(['/login']);
  	this.userAuthService.setLoggedData(null);
  }

  fixedMenu = false;
  showed_menu = false;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let top_pos = this.window.pageYOffset || 0;
    
    if (top_pos >= 10) {
      this.fixedMenu = true;
    } else if (this.fixedMenu && top_pos < 10) {
      this.fixedMenu = false;
    }
  }

  onShowMenu(opened){
    if(!opened)
      this.showed_menu = true;
    else
      this.showed_menu = false;
  }

}
