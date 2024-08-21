import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddAvisComponent} from "./add-avis/add-avis.component";
import {AllAvisComponent} from "./all-avis/all-avis.component";
import {AvisDetailComponent} from "./avis-detail/avis-detail.component";
import {EditAvisComponent} from "./edit-avis/edit-avis.component";


const routes: Routes = [
  {path: 'add-Avis', component: AddAvisComponent},
  {path: 'all-Avis', component: AllAvisComponent},
  {path: 'Avis-detail/:id', component: AvisDetailComponent},
  {path: 'edit-Avis/:id', component: EditAvisComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvisRoutingModule {
}
