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
  selectedFile: File | null = null;
  constructor(private fb: FormBuilder,
              private categorieService: CategorieService,
              private courService: CourService,
              private router: Router) {

    this.courForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duree: ['', Validators.required],
      prix: ['', Validators.required],
      affiche: ['', Validators.required]
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

    this.courService.ajouterCour(cour).subscribe(
      response => {
        console.log('Cour added successfully', response);
        if (this.selectedFile) {
          this.courService.uploadImage(this.selectedFile, response.id).subscribe({
            next: () => {
              console.log('Image uploaded successfully');
              this.router.navigateByUrl('/admin');
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


  onfileClick(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }

  }
}
