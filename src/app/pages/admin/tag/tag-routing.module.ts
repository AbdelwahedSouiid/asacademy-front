import {RouterModule, Routes} from "@angular/router";

import {NgModule} from "@angular/core";
import {AddTagComponent} from "./add-tag/add-tag.component";
import {AllTagsComponent} from "./all-tags/all-tags.component";
import {TagDetailComponent} from "./tag-detail/tag-detail.component";
import {EditTagComponent} from "./edit-tag/edit-tag.component";

const routes: Routes = [
  {path: 'add-Tag', component: AddTagComponent},
  {path: 'all-Tags', component: AllTagsComponent},
  {path: 'Tag-detail/:id', component: TagDetailComponent},
  {path: 'edit-Tag/:id', component: EditTagComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule {
}
