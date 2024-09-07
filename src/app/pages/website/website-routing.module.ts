import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainComponent} from "./fixed/main/main.component";
import {HomeComponent} from "./home/home.component";
import {ContactComponent} from "./contact/contact.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {MesCoursComponent} from "./acount/mes-cours/mes-cours.component";
import {ProfileComponent} from "./acount/profile/profile.component";
import {SettingsComponent} from "./acount/settings/settings.component";
import {UnauthComponent} from "./unauth/unauth.component";
import {CourDetailComponent} from "../website/gestion_cour/cour-detail/cour-detail.component";
import {VideosComponent} from "./gestion_videos/videos/videos.component";
import {CoursComponent} from "./gestion_cour/cours/cours.component";
import {ArticlesComponent} from "./gestion_article/articles/articles.component";
import {AboutComponent} from "./about/about.component";
import {ArticleDetailComponent} from "./gestion_article/article-detail/article-detail/article-detail.component";
import {WatchComponent} from "./gestion_videos/watch/watch.component";


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'about', component: AboutComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'mescours', component: MesCoursComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'unauth', component: UnauthComponent},
      //gestion video
      {path: 'videos', component: VideosComponent},
      {path: 'videos/video-detail/:id', component: WatchComponent},
      //gestion cour
      {path: 'cours/cour-detail/:id', component: CourDetailComponent},
      {path: 'cours', component: CoursComponent},

      // gestion article
      {path: 'articles', component: ArticlesComponent},
      {path: 'articles/article-detail/:id', component: ArticleDetailComponent},
      {path: 'articles/categorie/:categorieNom', component: ArticlesComponent},
      {path: 'articles/search/:searchTerm', component: ArticlesComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule {
}
