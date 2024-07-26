import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './fixed/main/main.component';
import { NavbarComponent } from './fixed/navbar/navbar.component';
import { AsideComponent } from './fixed/aside/aside.component';
import { FooterComponent } from './fixed/footer/footer.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AdminRoutingModule} from "./admin-routing.module";
import { MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { Aside2Component } from './fixed/aside2/aside2.component';
import { AddCourComponent } from './cour/add-cour/add-cour.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AddCategorieComponent} from './categorie/add-categorie/add-categorie.component';
import {HttpClientModule} from "@angular/common/http";



@NgModule({
    declarations: [
        DashboardComponent,
        MainComponent,
        NavbarComponent,
        AsideComponent,
        FooterComponent,
        Aside2Component,
        AddCourComponent,
      AddCategorieComponent,


    ],
  exports: [
    NavbarComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      ReactiveFormsModule,
      HttpClientModule

    ]
})
export class AdminModule { }
