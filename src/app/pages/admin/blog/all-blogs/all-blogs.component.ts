import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../../../services/blog/blog.service";
import {Blog} from "../../../../model/blog.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogueComponent} from "../../../website/confirm-dialogue/confirm-dialogue.component";

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css'] // Correction de 'styleUrl' en 'styleUrls'
})
export class AllBlogsComponent implements OnInit {

  listBlogs!: Blog[];

  constructor(private blogService: BlogService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogService.getBlogs().subscribe(
      data => {
        this.listBlogs = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  onDelete(blog: Blog): void {
    const dialogRef = this.dialog.open(ConfirmDialogueComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.blogService.delete(blog.id).subscribe(
          next => {
            // Supprimer le blog de la liste localement
            this.listBlogs = this.listBlogs.filter(b => b.id !== blog.id);
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
}
