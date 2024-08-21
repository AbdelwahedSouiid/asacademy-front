import {Component, OnInit} from '@angular/core';
import {CourService} from "../../../../services/cour/cour.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cour} from "../../../../model/cour.model";
import {Categorie} from "../../../../model/categorie.model";
import {CategorieService} from "../../../../services/categorie/categorie.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Formateur} from "../../../../model/formateur.model";
import {FormateurService} from "../../../../services/formateur/formateur.service";

@Component({
  selector: 'app-add-cour',
  templateUrl: './add-cour.component.html',
  styleUrl: './add-cour.component.css'
})
export class AddCourComponent implements OnInit {

  courForm: FormGroup;
  categories!: Categorie[];
  formateurs!: Formateur[];
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder,
              private categorieService: CategorieService,
              private courService: CourService,
              private router: Router,
              private formateurService: FormateurService,) {

    this.courForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duree: ['', Validators.required],
      prix: ['', Validators.required],
      affiche: ['', Validators.required],
      categorie: ['', Validators.required],
      formateur: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getFormateurs();
  }

  getCategories() {
    this.categorieService.getCategories().subscribe(
      data => {
        console.log('Categories:', data);
        this.categories = data;
      },
      error => {
        console.log('No Categories Found', error);
      }
    );
  }

  getFormateurs() {
    this.formateurService.getFormateurs().subscribe(
      data => {
        console.log('Formateurs:', data);
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

    const cour: Cour = {
      ...this.courForm.value,
      categorie: selectedCategorie,
      formateur: selectedFormateur,
      // Assurez-vous que les autres champs correspondent au modèle Cour
    };
    console.log(cour);

    this.courService.ajouterCour(cour).subscribe(
      response => {
        console.log('Cour added successfully', response);
        if (this.selectedFile) {
          this.courService.uploadImage(this.selectedFile, response.id).subscribe({
            next: () => {
              console.log('Image uploaded successfully');
              this.router.navigateByUrl('/admin/cours/all-Cours');
            },
            error: err => {
              console.error('Image upload failed', err);
            }
          });
        } else {
          this.router.navigateByUrl('/admin');
        }
      },
      error => {
        console.error('Error adding cour', error);
      }
    );
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
