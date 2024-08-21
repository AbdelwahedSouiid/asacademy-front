import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddCategorieComponent} from './add-categorie/add-categorie.component';
import {CategorieDetailComponent} from './categorie-detail/categorie-detail.component';
import {EditCategorieComponent} from './edit-categorie/edit-categorie.component';
import {AllCategorieComponent} from "./all-categorie/all-categorie.component";

const routes: Routes = [
  {path: 'add-Categorie', component: AddCategorieComponent},
  {path: 'all-Categories', component: AllCategorieComponent},
  {path: 'Categorie-detail/:id', component: CategorieDetailComponent},
  {path: 'edit-Categorie/:id', component: EditCategorieComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategorieRoutingModule {
}
