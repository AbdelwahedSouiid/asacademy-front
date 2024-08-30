import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourService} from "../../../../services/cour/cour.service";
import {Cour} from "../../../../model/cour.model";
import {environment} from "../../../../../environments/environment";
import {Categorie} from "../../../../model/categorie.model";
import {CategorieService} from "../../../../services/categorie/categorie.service";

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  searchTerm: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  categories: Categorie[] = [];
  categorieNom: string = '';
  cours: Cour[] = [];
  protected readonly environment = environment;
  showFilters: boolean = true;

  constructor(private courService: CourService, private route: ActivatedRoute, private categoryService: CategorieService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const pathSegment = this.route.snapshot.url[1]?.path;
      if (pathSegment === 'categorie') {
        this.categorieNom = params.get('categorieNom') ?? '';
        this.filterByCategory();
      } else if (pathSegment === 'search') {
        this.searchTerm = params.get('searchTerm') ?? '';
        this.search();
      } else {
        this.loadCours();
      }
    });
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data
      },
      error => {
        console.log('No Categories Found', error);
      }
    )
  }

  filterByCategory(): void {
    if (this.categorieNom.trim() !== '') {  // Check if categorieNom is not just whitespace or empty
      this.courService.getCoursByCategorie(this.categorieNom).subscribe(
        data => {
          this.cours = data;
        },
        err => {
          console.log('Error fetching courses by category:', err);
        }
      );
    } else {
      this.loadCours();  // Load all courses if categorieNom is empty
    }
  }


  search(): void {
    if (this.searchTerm.trim() !== '') {  // Check if searchTerm is not just whitespace or empty
      this.courService.searchCour(this.searchTerm).subscribe(
        data => {
          this.cours = data;
        },
        err => {
          console.log('Error searching for courses:', err);
        }
      );
    } else {
      this.loadCours();
    }
  }

  loadCours(): void {
    this.courService.getCours().subscribe(
      data => {
        this.cours = data;
      },
      err => {
        console.log('Error loading all courses:', err);
      }
    );
  }


  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}
