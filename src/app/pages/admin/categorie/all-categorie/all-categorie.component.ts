import {Component, OnInit} from '@angular/core';
import {Categorie} from "../../../../model/categorie.model";
import {CategorieService} from "../../../../services/categorie/categorie.service";

@Component({
  selector: 'app-all-categorie',
  templateUrl: './all-categorie.component.html',
  styleUrl: './all-categorie.component.css'
})
export class AllCategorieComponent implements OnInit {
  categories: Categorie[] = [];

  constructor(private categorieService: CategorieService) {
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categorieService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }


  onDelete(id: string): void {
    this.categorieService.deleteCategorie(id).subscribe(() => {
      this.loadCategories(); // Refresh the list
    });
  }
}
