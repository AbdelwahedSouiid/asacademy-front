import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../../../../services/blog/blog.service";
import {Blog} from "../../../../../model/blog.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent implements OnInit {
  currentBlog!: Blog;

  constructor(private blogService: BlogService, private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.getCurrentBlog();
  }

  getCurrentBlog() {
    // Récupération de l'ID depuis les paramètres de l'URL
    this.activatedRoute.paramMap.subscribe(params => {
      let idBlog = params.get('id')!;
      this.blogService.detail(idBlog).subscribe(blog => {
        this.currentBlog = blog;
      });
    });
  }

}
