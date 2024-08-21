import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddUserComponent} from "./add-user/add-user.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {AllUsersComponent} from "./all-users/all-users.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {UserRoutingModule} from "./user-routing.module";



@NgModule({
  declarations: [

    AddUserComponent,
    EditUserComponent,
    UserDetailComponent,
    AllUsersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    UserRoutingModule
  ]
})
export class UserModule { }
