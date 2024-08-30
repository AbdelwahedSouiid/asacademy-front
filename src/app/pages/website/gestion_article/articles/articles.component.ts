import {Component, OnInit, Renderer2} from '@angular/core';
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
  categorieNom: string = '';
  blogs!: Blog[];
  protected readonly environment = environment;

  constructor(private blogService: BlogService, private categoryService: CategorieService, private route: ActivatedRoute, private router: Router) {
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

  filterByCategory(): void {
    if (this.categorieNom.trim() !== '') {  // Check if categorieNom is not just whitespace or empty
      this.blogService.getBlogsByCategorie(this.categorieNom).subscribe(
        data => {
          this.blogs = data;
        },
        err => {
          console.log('Error fetching courses by category:', err);
        }
      );
    } else {
      this.getBlogs();  // Load all courses if categorieNom is empty
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data
      },
      error => {
        console.log('No Categories Found', error);
      }
    )
  }


}
