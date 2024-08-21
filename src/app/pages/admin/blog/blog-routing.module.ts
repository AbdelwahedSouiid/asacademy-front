import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddBlogComponent} from "./add-blog/add-blog.component";
import {AllBlogsComponent} from "./all-blogs/all-blogs.component";
import {BlogDetailsComponent} from "./blog-details/blog-details.component";
import {EditBlogComponent} from "./edit-blog/edit-blog.component";


const routes: Routes = [
  {path: 'add-Blog', component: AddBlogComponent},
  {path: 'all-Blogs', component: AllBlogsComponent},
  {path: 'Blog-detail/:id', component: BlogDetailsComponent},
  {path: 'edit-Blog/:id', component: EditBlogComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
