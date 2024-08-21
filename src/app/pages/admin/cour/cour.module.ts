import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddCourComponent} from "./add-cour/add-cour.component";
import {EditCourComponent} from "./edit-cour/edit-cour.component";
import {CourDetailComponent} from "./cour-detail/cour-detail.component";
import {AllCoursComponent} from "./all-cours/all-cours.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {CourRoutingModule} from "./cour-routing.module";



@NgModule({
  declarations: [
    AddCourComponent,
    EditCourComponent,
    CourDetailComponent,
    AllCoursComponent

  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
      CourRoutingModule
    ]
})
export class CourModule { }
