import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {MainComponent} from "./fixed/main/main.component";
import {AuthenticationGuard} from "../../guards/authentication.guard";
import {AuthorizationGuard} from "../../guards/autorization.guard";


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthenticationGuard, AuthorizationGuard],
    data: {roles: ['ADMIN']},
    children: [
      {path: '', component: DashboardComponent},
      {path: 'cours', loadChildren: () => import('./cour/cour.module').then(m => m.CourModule)},
      {path: 'categories', loadChildren: () => import('./categorie/categorie.module').then(m => m.CategorieModule)},
      {
        path: 'inscriptions',
        loadChildren: () => import('./inscription/inscription.module').then(m => m.InscriptionModule)
      },
      {path: 'formateurs', loadChildren: () => import('./formateur/formateur.module').then(m => m.FormateurModule)},
      {path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
      {path: 'blogs', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)},
      {path: 'avis', loadChildren: () => import('./avis/avis.module').then(m => m.AvisModule)},
      {path: 'videos', loadChildren: () => import('./video/video.module').then(m => m.VideoModule)},
      {path: 'tags', loadChildren: () => import('./tag/tag.module').then(m => m.TagModule)},
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
