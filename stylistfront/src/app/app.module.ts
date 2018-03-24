import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './base/header-component/header-component.component';
import { LoginComponentComponent } from './pages/login-component/login-component.component';
import { RegistrationComponentComponent } from './pages/registration-component/registration-component.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    LoginComponentComponent,
    RegistrationComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
