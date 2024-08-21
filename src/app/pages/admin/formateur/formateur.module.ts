import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFormateurComponent } from './add-formateur/add-formateur.component';
import { EditFormateurComponent } from './edit-formateur/edit-formateur.component';
import { AllFormateurComponent } from './all-formateur/all-formateur.component';
import { FormateurDetailComponent } from './formateur-detail/formateur-detail.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {FormateurRoutingModule} from "./formateur-routing.module";




@NgModule({
  declarations: [
   AddFormateurComponent,
   EditFormateurComponent,
   AllFormateurComponent,
   FormateurDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormateurRoutingModule
  ]
})
export class FormateurModule { }
