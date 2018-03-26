import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { UserAuthService } from './services/user.auth.service';
import { ManageServicesService } from './services/manage-services.service';
import { ManageAvailabilityService } from './services/manage-availability.service';
import { WINDOW_PROVIDERS } from "./services/window.service";
import { LoginRouteGuard } from './services/login-guard';

import { AppComponent } from './app.component';
import { HeaderComponent } from './base/header-component/header-component.component';
import { LoginComponent } from './pages/login-component/login-component.component';
import { RegistrationComponent } from './pages/registration-component/registration-component.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { ServicesComponent } from './pages/settings/services/services.component';
import { AddServiceComponent } from './pages/settings/add-service/add-service.component';
import { HomeComponent } from './pages/home/home.component';
import { AvailabilityComponent } from './pages/settings/availability/availability.component';

const routes = [
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegistrationComponent}, 
  {path: 'personal',component: PersonalComponent, canActivate: [LoginRouteGuard]},
  {path: 'personal/services',component: ServicesComponent, canActivate: [LoginRouteGuard]},
  {path: 'personal/availability',component: AvailabilityComponent, canActivate: [LoginRouteGuard]},
  {path: 'personal/add-service',component: AddServiceComponent, canActivate: [LoginRouteGuard]},
  {path: '',component: HomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    PersonalComponent,
    ServicesComponent,
    AddServiceComponent,
    HomeComponent,
    AvailabilityComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    UserAuthService,
    ManageServicesService,
    ManageAvailabilityService,
    WINDOW_PROVIDERS,
    LoginRouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }