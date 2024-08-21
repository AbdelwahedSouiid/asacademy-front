import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './fixed/main/main.component';
import {NavbarComponent} from './fixed/navbar/navbar.component';
import {AsideComponent} from './fixed/aside/aside.component';
import {FooterComponent} from './fixed/footer/footer.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {Aside2Component} from './fixed/aside2/aside2.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {CourModule} from "./cour/cour.module";
import {CategorieModule} from "./categorie/categorie.module";
import {InscriptionModule} from "./inscription/inscription.module";
import {AvisModule} from "./avis/avis.module";
import {FormateurModule} from "./formateur/formateur.module";
import {UserModule} from "./user/user.module";
import {BlogModule} from "./blog/blog.module";
import {TagModule} from "./tag/tag.module";
import {VideoModule} from "./video/video.module";


@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    NavbarComponent,
    AsideComponent,
    FooterComponent,
    Aside2Component,
  ],
  exports: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,

    /* materiels modules */
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,

    /* admin site  Modules*/
    CourModule,
    CategorieModule,
    InscriptionModule,
    AvisModule,
    FormateurModule,
    UserModule,
    BlogModule,
    TagModule,
    VideoModule
  ]
})
export class AdminModule {
}
