/* ajout

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

*/

/* detail

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

 */

/* getall
*
*
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
*  */


/* update
*
*
* blog!: Blog;
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
*
* */
