import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../../../services/blog/blog.service";
import {Blog} from "../../../../model/blog.model";
import {environment} from "../../../../../environments/environment";
import {Categorie} from "../../../../model/categorie.model";
import {CategorieService} from "../../../../services/categorie/categorie.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit {
  searchTerm: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  categories: Categorie[] = [];

  blogs!: Blog[];

  showFilters: boolean = true;

  protected readonly environment = environment;

  constructor(private blogService: BlogService) {
  }

  ngOnInit(): void {
    this.getBlogs()
  }

  getBlogs() {
    this.blogService.getBlogs().subscribe(
      data => this.blogs = data
      ,
      error => console.log(error)
    )
  }

  search(): void {
    if (this.searchTerm.trim() !== '') {  // Check if searchTerm is not just whitespace or empty
      this.blogService.searchBlog(this.searchTerm).subscribe(
        data => {
          this.blogs = data;
        },
        err => {
          console.log('Error searching for courses:', err);
        }
      );
    } else {
      this.getBlogs();
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }


}
