import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {MainComponent} from "./fixed/main/main.component";
import {HomeComponent} from "./home/home.component";
import {ContactComponent} from "./contact/contact.component";
import {CourComponent} from "./cour/cour.component";


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'contact', component: ContactComponent },
      {path: 'cour' , component: CourComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule {}
