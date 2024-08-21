import {Component, OnInit, Renderer2} from '@angular/core';
import {BlogService} from "../../../../services/blog/blog.service";
import {Blog} from "../../../../model/blog.model";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit {

  blogs!: Blog[];

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

}
