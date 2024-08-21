import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddUserComponent} from "./add-user/add-user.component";
import {AllUsersComponent} from "./all-users/all-users.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {EditUserComponent} from "./edit-user/edit-user.component";


const routes: Routes = [
  {path: 'add-User', component: AddUserComponent},
  {path: 'all-Users', component: AllUsersComponent},
  {path: 'User-detail/:id', component: UserDetailComponent},
  {path: 'edit-User/:id', component: EditUserComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
