import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddReclamationComponent} from "./add-reclamation/add-reclamation.component";
import {AllReclamationComponent} from "./all-reclamation/all-reclamation.component";
import {ReclamationDetailComponent} from "./reclamation-detail/reclamation-detail.component";
import {EditReclamationComponent} from "./edit-reclamation/edit-reclamation.component";


const routes: Routes = [
  {path: 'add-Reclamation', component: AddReclamationComponent},
  {path: 'all-Reclamations', component: AllReclamationComponent},
  {path: 'Reclamation-detail/:id', component: ReclamationDetailComponent},
  {path: 'edit-Reclamation/:id', component: EditReclamationComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamationRoutingModule {
}
