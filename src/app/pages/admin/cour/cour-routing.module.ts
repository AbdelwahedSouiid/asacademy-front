import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AddCourComponent} from './add-cour/add-cour.component';
import {AllCoursComponent} from './all-cours/all-cours.component';
import {CourDetailComponent} from './cour-detail/cour-detail.component';
import {EditCourComponent} from './edit-cour/edit-cour.component';

const routes: Routes = [
  {path: 'add-Cour', component: AddCourComponent},
  {path: 'all-Cours', component: AllCoursComponent},
  {path: 'Cour-detail/:id', component: CourDetailComponent},
  {path: 'edit-Cour/:id', component: EditCourComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourRoutingModule {
}
