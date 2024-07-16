import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/account/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";

import {AuthInterceptor} from "./interceptors/app-http.interceptor";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {AuthorizationGuard} from "./guards/autorization.guard";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RegisterComponent } from './pages/account/register/register.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [

    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthenticationGuard,
    AuthorizationGuard,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
