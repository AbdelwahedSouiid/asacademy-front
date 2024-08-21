import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {CategorieRoutingModule} from "../categorie/categorie-routing.module";
import {BlogRoutingModule} from "./blog-routing.module";



@NgModule({
  declarations: [
    AddBlogComponent,
    EditBlogComponent,
    AllBlogsComponent,
    BlogDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    BlogRoutingModule
  ]
})
export class BlogModule { }
