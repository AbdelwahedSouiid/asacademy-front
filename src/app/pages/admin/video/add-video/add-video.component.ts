import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VideoService} from "../../../../services/video/video.service";
import {CategorieService} from "../../../../services/categorie/categorie.service";
import {TagService} from "../../../../services/tag/tag.service";
import {Categorie} from "../../../../model/categorie.model";
import {Tag} from "../../../../model/tag.model";
import {Video} from "../../../../model/video.model";
import {FormateurService} from "../../../../services/formateur/formateur.service";
import {Formateur} from "../../../../model/formateur.model";
import {Cour} from "../../../../model/cour.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrl: './add-video.component.css'
})
export class AddVideoComponent {
  videoForm: FormGroup;
  categories!: Categorie[];
  tags!: Tag[];
  formateurs!: Formateur[];
  selectedFile: File | null = null;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private videoService: VideoService,
    private categorieService: CategorieService,
    private tagService: TagService,
    private formateurService: FormateurService
  ) {
    this.videoForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      categorie: ['', Validators.required],
      formateur: ['', Validators.required],
      videoUrl: ['', Validators.required],
      // thumbnailUrl: ['', Validators.required],
      // tags: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadFormateurs();
    // this.loadTags();

  }

  loadCategories(): void {
    this.categorieService.getCategories().subscribe((data: any[]) => {
      this.categories = data;
    });
  }

  loadFormateurs(): void {
    this.formateurService.getFormateurs().subscribe((data: any[]) => {
      this.formateurs = data;
    });
  }

  loadTags(): void {
    this.tagService.getTags().subscribe((data: any[]) => {
      this.tags = data;
    });
  }

  handleAjouterVideo(): void {
    if (this.videoForm.valid) {

      const selectedCategorie = this.categories.find(c => c.id === this.videoForm.value.categorie);
      const selectedFormateur = this.formateurs.find(f => f.id === this.videoForm.value.formateur);

      if (!selectedCategorie || !selectedFormateur) {
        console.error('Categorie or Formateur not found');
        return;
      }
      const videoData: Video = {
        ...this.videoForm.value,
        categorie: selectedCategorie,
        formateur: selectedFormateur,
      }


      this.videoService.ajouterVideo(videoData).subscribe(
        response => {
          console.log('Video added successfully', response);
          if (this.selectedFile) {
            this.videoService.uploadVideo(this.selectedFile, response.id).subscribe({
              next: () => {
                console.log('Video uploaded successfully');
                this.router.navigateByUrl('/admin/videos/all-Videos');
              },
              error: err => {
                console.error('Video upload failed', err);
              }
            });
          } else {
            this.router.navigateByUrl('/admin');
          }

        },
        error => {
          console.error('Error adding video', error);
        }
      );
    } else {
      console.log("form invalid");
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);
    }
  }
}
