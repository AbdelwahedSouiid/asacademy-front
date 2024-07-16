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



@NgModule({
    declarations: [
        DashboardComponent,
        MainComponent,
        NavbarComponent,
        AsideComponent,
        FooterComponent,
        Aside2Component,
        AddCourComponent,


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
      MatIconModule


    ]
})
export class AdminModule { }
