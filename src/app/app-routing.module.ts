import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/account/login/login.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {AuthorizationGuard} from "./guards/autorization.guard";
import {RegisterComponent} from "./pages/account/register/register.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/website/website.module').then(m => m.WebsiteModule) },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
