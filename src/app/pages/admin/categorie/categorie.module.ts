import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddCategorieComponent} from "./add-categorie/add-categorie.component";
import {EditCategorieComponent} from "./edit-categorie/edit-categorie.component";
import {AllCategorieComponent} from "./all-categorie/all-categorie.component";
import {CategorieDetailComponent} from "./categorie-detail/categorie-detail.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

import {CategorieRoutingModule} from "./categorie-routing.module";



@NgModule({
  declarations: [
    AddCategorieComponent,
    EditCategorieComponent,
    AllCategorieComponent,
    CategorieDetailComponent

  ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterLink,
      CategorieRoutingModule
    ]
})
export class CategorieModule { }
