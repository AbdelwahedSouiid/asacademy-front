import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './fixed/navbar/navbar.component';
import { FooterComponent } from './fixed/footer/footer.component';
import { MainComponent } from './fixed/main/main.component';
import {WebsiteRoutingModule} from "./website-routing.module";
import { ContactComponent } from './contact/contact.component';
import { CourComponent } from './cour/cour.component';



@NgModule({
    declarations: [
        HomeComponent,
        NavbarComponent,
        FooterComponent,
        MainComponent,
        ContactComponent,
        CourComponent
    ],
  exports: [
    FooterComponent,
    NavbarComponent
  ],
    imports: [
        CommonModule,
        WebsiteRoutingModule
    ]
})
export class WebsiteModule { }
