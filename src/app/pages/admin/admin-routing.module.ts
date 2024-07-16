import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {MainComponent} from "./fixed/main/main.component";
import {AuthenticationGuard} from "../../guards/authentication.guard";
import {AuthorizationGuard} from "../../guards/autorization.guard";
import {AddCourComponent} from "./cour/add-cour/add-cour.component";




const routes: Routes = [
  {
    path: '',
    component: MainComponent,
     canActivate: [AuthenticationGuard, AuthorizationGuard],
     data: { roles: ['ADMIN'] },
    children: [
      { path: '', component: DashboardComponent },
      {path:'ajouterCour',component:AddCourComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
