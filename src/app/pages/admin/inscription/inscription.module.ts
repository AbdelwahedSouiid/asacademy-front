import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddInscriptionComponent } from './add-inscription/add-inscription.component';
import { EditInscriptionComponent } from './edit-inscription/edit-inscription.component';
import { InscriptionDetailComponent } from './inscription-detail/inscription-detail.component';
import { AllInscriptionsComponent } from './all-inscriptions/all-inscriptions.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {InscriptionRoutingModule} from "./inscription-routing.module";



@NgModule({
  declarations: [
    AddInscriptionComponent,
    EditInscriptionComponent,
    InscriptionDetailComponent,
    AllInscriptionsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    InscriptionRoutingModule
  ]
})
export class InscriptionModule { }
