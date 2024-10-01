import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddReclamationComponent} from './add-reclamation/add-reclamation.component';
import {AllReclamationComponent} from './all-reclamation/all-reclamation.component';
import {EditReclamationComponent} from './edit-reclamation/edit-reclamation.component';
import {ReclamationDetailComponent} from './reclamation-detail/reclamation-detail.component';
import {ReclamationRoutingModule} from "./reclamation-routing.module";


@NgModule({
  declarations: [
    AddReclamationComponent,
    AllReclamationComponent,
    EditReclamationComponent,
    ReclamationDetailComponent
  ],
  imports: [
    CommonModule,
    ReclamationRoutingModule,
  ]
})
export class ReclamationModule {
}
