import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {MainComponent} from "./fixed/main/main.component";
import {AuthenticationGuard} from "../../guards/authentication.guard";
import {AuthorizationGuard} from "../../guards/autorization.guard";
import {AddCourComponent} from "./cour/add-cour/add-cour.component";
import {AddCategorieComponent} from "./categorie/add-categorie/add-categorie.component";




const routes: Routes = [
  {
    path: '',
    component: MainComponent,
     canActivate: [AuthenticationGuard, AuthorizationGuard],
     data: { roles: ['ADMIN'] },
    children: [
      { path: '', component: DashboardComponent },
      {path: 'ajouterCour', component: AddCourComponent},
      {path: 'ajouterCategorie', component: AddCategorieComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
