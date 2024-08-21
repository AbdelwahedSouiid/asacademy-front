import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddInscriptionComponent} from "./add-inscription/add-inscription.component";
import {AllInscriptionsComponent} from "./all-inscriptions/all-inscriptions.component";
import {InscriptionDetailComponent} from "./inscription-detail/inscription-detail.component";
import {EditInscriptionComponent} from "./edit-inscription/edit-inscription.component";


const routes: Routes = [
  {path: 'add-Inscription', component: AddInscriptionComponent},
  {path: 'all-Inscriptions', component: AllInscriptionsComponent},
  {path: 'Inscription-detail/:id', component: InscriptionDetailComponent},
  {path: 'edit-Inscription/:id', component: EditInscriptionComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionRoutingModule {
}
