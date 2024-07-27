import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {MainComponent} from "./fixed/main/main.component";
import {HomeComponent} from "./home/home.component";
import {ContactComponent} from "./contact/contact.component";
import {CourComponent} from "./cour/cour.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {MesCoursComponent} from "./acount/mes-cours/mes-cours.component";
import {ProfileComponent} from "./acount/profile/profile.component";
import {SettingsComponent} from "./acount/settings/settings.component";
import {UnauthComponent} from "./unauth/unauth.component";


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'cour', component: CourComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'mescours', component: MesCoursComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'unauth', component: UnauthComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule {}
