import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddTagComponent} from './add-tag/add-tag.component';
import {AllTagsComponent} from './all-tags/all-tags.component';
import {TagDetailComponent} from './tag-detail/tag-detail.component';
import {EditTagComponent} from './edit-tag/edit-tag.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {TagRoutingModule} from "./tag-routing.module";


@NgModule({
  declarations: [
    AddTagComponent,
    AllTagsComponent,
    TagDetailComponent,
    EditTagComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    TagRoutingModule
  ]
})
export class TagModule {
}
