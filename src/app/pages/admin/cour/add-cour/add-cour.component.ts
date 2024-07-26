import {Component, OnInit} from '@angular/core';
import {CourService} from "../../../../services/cour/cour.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cour} from "../../../../model/cour.model";
import {Categorie} from "../../../../model/categorie.model";
import {CategorieService} from "../../../../services/categorie/categorie.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-add-cour',
  templateUrl: './add-cour.component.html',
  styleUrl: './add-cour.component.css'
})
export class AddCourComponent implements OnInit {

  courForm: FormGroup;
  categories: any[] = [];

  constructor(private fb: FormBuilder,
              private categorieService: CategorieService,
              private courService: CourService,
              private router: Router) {

    this.courForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duree: ['', Validators.required],
      prix: ['', Validators.required],
      video: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categorieService.getCategories().subscribe(
      data => {
        console.log('Categories:', data); // Log the data to verify
        this.categories = data;
      },
      error => {
        console.log('No Categories Found', error);
      }
    );
  }

  handleAddCour(): void {
    if (this.courForm.invalid) {
      return;
    }

    const cour: Cour = this.courForm.value;
    console.log(cour);
    this.courService.ajouterCour(cour).subscribe(
      response => {
        console.log('Cour added successfully', response);
        this.router.navigate(['/admin']);
      },
      error => {
        console.error('Error adding cour', error);
      }
    );
  }

}
