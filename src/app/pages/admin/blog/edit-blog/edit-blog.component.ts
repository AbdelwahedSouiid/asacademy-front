import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../../../services/blog/blog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Blog} from "../../../../model/blog.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourService} from "../../../../services/cour/cour.service";

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css'] // Corrigé de `styleUrl` à `styleUrls`
})
export class EditBlogComponent implements OnInit {
  blog!: Blog;
  blogForm: FormGroup;
  cours: any[] = []; // Pour stocker les cours disponibles

  constructor(
    private blogService: BlogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private courService: CourService,
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      cour: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCurrentBlog();
    this.loadCourses();
  }

  loadCurrentBlog(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let idBlog = params.get('id')!;
      this.blogService.detail(idBlog).subscribe(blog => {
        this.blog = blog;
        this.blogForm.patchValue({
          title: blog.title,
          content: blog.content,
          cour: blog.cour.id
        });
      });
    });
  }

  loadCourses(): void {

    this.courService.getCours().subscribe(courses => {
      this.cours = courses;
    });

  }

  handleUpdateBlog(): void {
    if (this.blogForm.valid) {
      const updatedBlog: Blog = {
        ...this.blog,
        title: this.blogForm.value.title,
        content: this.blogForm.value.content,
        cour: this.cours.find(c => c.id === this.blogForm.value.cour)
      };
      this.blogService.update(updatedBlog).subscribe(
        () => {
          this.router.navigate(['/admin/blogs/all-Blogs']);
        },
        error => {
          console.error('Error updating blog:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
