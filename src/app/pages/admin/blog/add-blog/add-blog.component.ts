import {Component, OnInit, Renderer2} from '@angular/core';
import {Router} from "@angular/router";
import {BlogService} from "../../../../services/blog/blog.service";

import {Cour} from "../../../../model/cour.model";
import {CourService} from "../../../../services/cour/cour.service";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Blog} from "../../../../model/blog.model";

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent implements OnInit {

  cours!: Cour[];

  blogForm!: FormGroup;

  constructor(private router: Router, private blogService: BlogService, private courService: CourService, private fb: FormBuilder) {
    this.blogForm = this.fb.group({
        title: ['', Validators.required],
        content: ['', Validators.required],
        // imageUrl: ['', Validators.required],
        cour: ['', Validators.required],
      }
    )
  }

  ngOnInit(): void {
    this.getCours();
  }

  getCours(): void {
    this.courService.getCours().subscribe(
      next => {
        this.cours = next;
      }, error => {
        console.log(error);
      }
    )
  }

  handleAjouterBlog(): void {
    if (this.blogForm.invalid) {
      return;
    }

    const blog: Blog = {
      ...this.blogForm.value,
      cour: this.cours.find(c => c.id === this.blogForm.value.cour)
    };

    console.log(blog);
    this.blogService.ajouterBlog(blog).subscribe(
      (response: Blog) => {
        console.log(response);
        this.router.navigate(['admin/blogs/all-Blogs']);
      }, error => {
        console.log(error);
      }
    );
  }

}
