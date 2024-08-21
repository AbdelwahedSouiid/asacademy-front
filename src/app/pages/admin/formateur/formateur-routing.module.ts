import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddFormateurComponent} from "./add-formateur/add-formateur.component";
import {AllFormateurComponent} from "./all-formateur/all-formateur.component";
import {FormateurDetailComponent} from "./formateur-detail/formateur-detail.component";
import {EditFormateurComponent} from "./edit-formateur/edit-formateur.component";


const routes: Routes = [
  {path: 'add-Formateur', component: AddFormateurComponent},
  {path: 'all-Formateurs', component: AllFormateurComponent},
  {path: 'Formateur-detail/:id', component: FormateurDetailComponent},
  {path: 'edit-Formateur/:id', component: EditFormateurComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormateurRoutingModule {
}
