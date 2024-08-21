import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Categorie} from "../../../../model/categorie.model";
import {Formateur} from "../../../../model/formateur.model";
import {CategorieService} from "../../../../services/categorie/categorie.service";
import {CourService} from "../../../../services/cour/cour.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormateurService} from "../../../../services/formateur/formateur.service";
import {Cour} from "../../../../model/cour.model";

@Component({
  selector: 'app-edit-cour',
  templateUrl: './edit-cour.component.html',
  styleUrls: ['./edit-cour.component.css']
})
export class EditCourComponent implements OnInit {
  currentCour!: Cour;
  courForm: FormGroup;
  categories!: any[];
  formateurs!: any[];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private categorieService: CategorieService,
    private courService: CourService,
    private router: Router,
    private formateurService: FormateurService,
    private activatedRoute: ActivatedRoute
  ) {
    this.courForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duree: ['', Validators.required],
      prix: ['', Validators.required],
      categorie: ['', Validators.required],
      formateur: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCurrentCour();
    this.getCategories();
    this.getFormateurs();
  }

  loadCurrentCour(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const idCour = params.get('id')!;
      this.courService.detail(idCour).subscribe(cour => {
        this.currentCour = cour;
        console.log(this.currentCour);
        this.courForm.patchValue({
          name: cour.name,
          description: cour.description,
          duree: cour.duree,
          prix: cour.prix,
          categorie: cour.categorie.id,
          formateur: cour.formateur.id
        });
      });
    });
  }

  getCategories() {
    this.categorieService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('No Categories Found', error);
      }
    );
  }

  getFormateurs() {
    this.formateurService.getFormateurs().subscribe(
      data => {
        this.formateurs = data;
      },
      error => {
        console.error('No Formateurs Found', error);
      }
    );
  }

  handleEditCour(): void {
    if (this.courForm.valid) {
      const updatedCour: Cour = {
        ...this.currentCour,
        name: this.courForm.value.name,
        description: this.courForm.value.description,
        duree: this.courForm.value.duree,
        prix: this.courForm.value.prix,
        categorie: this.categories.find(c => c.id === this.courForm.value.categorie),
        formateur: this.formateurs.find(f => f.id === this.courForm.value.formateur)
      };
      this.courService.update(updatedCour).subscribe(
        () => {
          this.router.navigate(['/admin/cours/all-Cours']);
        },
        error => {
          console.error('Error updating cour', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
