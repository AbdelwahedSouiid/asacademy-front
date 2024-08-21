import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAvisComponent } from './add-avis/add-avis.component';
import { AllAvisComponent } from './all-avis/all-avis.component';
import { EditAvisComponent } from './edit-avis/edit-avis.component';
import { AvisDetailComponent } from './avis-detail/avis-detail.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {CategorieRoutingModule} from "../categorie/categorie-routing.module";
import {AvisRoutingModule} from "./avis-routing.module";



@NgModule({
  declarations: [
    AddAvisComponent,
    AllAvisComponent,
    EditAvisComponent,
    AvisDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    AvisRoutingModule
  ]
})
export class AvisModule { }
