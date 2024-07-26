import {Component, OnInit, Renderer2} from '@angular/core';
import {CategorieService} from "../../../../services/categorie/categorie.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Categorie} from "../../../../model/categorie.model";

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrl: './add-categorie.component.css'
})
export class AddCategorieComponent implements OnInit {

  categorieForm: FormGroup;

  constructor(private fb: FormBuilder,
              private categorieService: CategorieService,
              private router: Router) {
    this.categorieForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Initialization logic if necessary
  }

  handleAddCategorie(): void {
    if (this.categorieForm.invalid) {
      return;
    }

    const categorie: Categorie = this.categorieForm.value;
    this.categorieService.addCategorie(categorie).subscribe(
      response => {
        console.log('Categorie added successfully', response);
        this.router.navigate(['/admin']);
      },
      error => {
        console.error('Error adding categorie', error);
      }
    );
  }
}
