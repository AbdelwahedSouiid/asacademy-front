import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CourService} from '../../../../services/cour/cour.service';
import {CategorieService} from '../../../../services/categorie/categorie.service';
import {FormateurService} from '../../../../services/formateur/formateur.service';
import {TagService} from '../../../../services/tag/tag.service';
import {Cour, PaiementType} from '../../../../model/cour.model';
import {Categorie} from '../../../../model/categorie.model';
import {Formateur} from '../../../../model/formateur.model';

@Component({
  selector: 'app-add-cour',
  templateUrl: './add-cour.component.html',
  styleUrls: ['./add-cour.component.css']
})
export class AddCourComponent implements OnInit {
  courForm: FormGroup;
  categories: Categorie[] = [];
  formateurs: Formateur[] = [];
  tags: any[] = [];


  selectedAfficheFile: File | null = null;
  selectedVideoFile: File | null = null;


  constructor(
    private fb: FormBuilder,
    private categorieService: CategorieService,
    private courService: CourService,
    private router: Router,
    private formateurService: FormateurService,
    private tagService: TagService
  ) {
    this.courForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duree: ['', Validators.required],
      prix: ['', Validators.required],
      affiche: ['', Validators.required],
      paiement: [PaiementType.GRATUIT, Validators.required],
      categorie: ['', Validators.required],
      formateur: ['', Validators.required],
      tags: [[], Validators.required],
      video: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getFormateurs();
    this.getTags();
  }

  getCategories() {
    this.categorieService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.log('No Categories Found', error);
      }
    );
  }

  getTags() {
    this.tagService.getTags().subscribe(
      data => {
        this.tags = data;
      },
      error => {
        console.log('No Tags Found', error);
      }
    );
  }

  getFormateurs() {
    this.formateurService.getFormateurs().subscribe(
      data => {
        this.formateurs = data;
      },
      error => {
        console.log('No Formateurs Found', error);
      }
    );
  }

  handleAddCour(): void {
    if (this.courForm.invalid) {
      return;
    }

    // Trouver la catégorie et le formateur sélectionnés
    const selectedCategorie = this.categories.find(c => c.id === this.courForm.value.categorie);
    const selectedFormateur = this.formateurs.find(f => f.id === this.courForm.value.formateur);

    // Assurer que les objets sont trouvés
    if (!selectedCategorie || !selectedFormateur) {
      console.error('Categorie or Formateur not found');
      return;
    }

    // Map the selected tags
    const selectedTags = this.tags.filter(tag => this.courForm.value.tags.includes(tag.id));

    const cour: Cour = {
      ...this.courForm.value,
      categorie: selectedCategorie,
      formateur: selectedFormateur,
      tags: selectedTags
    };

    this.courService.ajouterCour(cour).subscribe(
      response => {
        console.log('Cour added successfully', response);
        if (this.selectedAfficheFile && this.selectedVideoFile) {
          this.courService.uploadImage(this.selectedAfficheFile, response.id).subscribe({
            next: () => {
              console.log('Affiche uploaded successfully');
              this.router.navigateByUrl('/admin/cours/all-Cours');
            },
            error: err => {
              console.error('Image upload failed', err);
            }
          });
          this.courService.uploadCourVideo(this.selectedVideoFile, response.id).subscribe(
            next => {
              console.log('Video uploaded successfully');
            }, error => {
              console.log(error);
            }
          )
        } else {
          this.router.navigateByUrl('/admin');
        }
      },
      error => {
        console.error('Error adding cour', error);
      }
    );
  }

  onAfficheSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedAfficheFile = input.files[0];
    }
  }

  onVideoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedVideoFile = input.files[0];
    }
  }

  protected readonly PaiementType = PaiementType;
}
