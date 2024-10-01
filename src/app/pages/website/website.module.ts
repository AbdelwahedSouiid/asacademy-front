import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './fixed/navbar/navbar.component';
import {FooterComponent} from './fixed/footer/footer.component';
import {MainComponent} from './fixed/main/main.component';
import {WebsiteRoutingModule} from "./website-routing.module";
import {ContactComponent} from './contact/contact.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {AuthInterceptor} from "../../interceptors/app-http.interceptor";
import {AboutComponent} from './about/about.component';
import {FilterPipe} from './gestion_cour/filter.pipe';
import {ArticleDetailComponent} from './gestion_article/article-detail/article-detail/article-detail.component';
import {WatchComponent} from './gestion_videos/watch/watch.component';
import {ChatbotComponent} from '../admin/chatbot/chatbot.component';


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
    AboutComponent,
    FilterPipe,
    ArticleDetailComponent,
    WatchComponent,
    ChatbotComponent
  ],
  exports: [],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogContent,
    MatDialogActions,
  ]
})
export class WebsiteModule {
}
