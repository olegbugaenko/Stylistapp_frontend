import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { UserAuthService } from './services/user.auth.service';


import { AppComponent } from './app.component';
import { HeaderComponent } from './base/header-component/header-component.component';
import { LoginComponent } from './pages/login-component/login-component.component';
import { RegistrationComponent } from './pages/registration-component/registration-component.component';
import { PersonalComponent } from './pages/personal/personal.component';

const routes = [
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegistrationComponent}, 
  {path: 'personal',component: PersonalComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    PersonalComponent
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
    UserAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }