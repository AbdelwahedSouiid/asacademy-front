import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './fixed/navbar/navbar.component';
import {FooterComponent} from './fixed/footer/footer.component';
import {MainComponent} from './fixed/main/main.component';
import {WebsiteRoutingModule} from "./website-routing.module";
import {ContactComponent} from './contact/contact.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MesCoursComponent} from './acount/mes-cours/mes-cours.component';
import {ProfileComponent} from './acount/profile/profile.component';
import {SettingsComponent} from './acount/settings/settings.component';
import {UnauthComponent} from "./unauth/unauth.component";
import {CourDetailComponent} from './gestion_cour/cour-detail/cour-detail.component';
import {ConfirmDialogueComponent} from './confirm-dialogue/confirm-dialogue.component';
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {VideosComponent} from './gestion_videos/videos/videos.component';
import {ArticlesComponent} from './gestion_article/articles/articles.component';
import {CoursComponent} from './gestion_cour/cours/cours.component';
import {WatchComponent} from './gestion_videos/watch/watch.component';
import {AuthInterceptor} from "../../interceptors/app-http.interceptor";


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    MainComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    MesCoursComponent,
    ProfileComponent,
    SettingsComponent,
    UnauthComponent,
    CourDetailComponent,
    ConfirmDialogueComponent,
    VideosComponent,
    ArticlesComponent,
    CoursComponent,
    WatchComponent
  ],
  exports: [],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogContent,
    MatDialogActions
  ]
})
export class WebsiteModule {
}
