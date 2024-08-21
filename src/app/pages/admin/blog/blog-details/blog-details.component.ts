import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BlogService} from "../../../../services/blog/blog.service";
import {Blog} from "../../../../model/blog.model";
import {ConfirmDialogueComponent} from "../../../website/confirm-dialogue/confirm-dialogue.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit {

  blog!: Blog;

  constructor(private router: Router, private blogService: BlogService, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadCurrentBlog();
  }

  loadCurrentBlog(): void {
    // Récupération de l'ID depuis les paramètres de l'URL
    this.activatedRoute.paramMap.subscribe(params => {
      let idBlog = params.get('id')!;
      this.blogService.detail(idBlog).subscribe(blog => {
        this.blog = blog;
      });
    });
  }

  deleteBlog(blog: Blog) {
    const dialogRef = this.dialog.open(ConfirmDialogueComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.blogService.delete(blog.id).subscribe(
          next => {
            this.router.navigateByUrl("/admin/blogs/all-Blogs")
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
}
