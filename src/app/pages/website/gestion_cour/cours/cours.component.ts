import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
  selectedTag: string = '';
  selectedCategory: string = '';
  selectedPrice: string = '';

  startDate: Date = new Date();
  endDate: Date = new Date();
  categories: Categorie[] = [];
  cours: Cour[] = [];
  protected readonly environment = environment;
  showFilters: boolean = true;


  constructor(private courService: CourService, private router: Router, private categoryService: CategorieService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['name'] || '';
      this.selectedTag = params['tag'] || '';
      this.selectedCategory = params['category'] || '';
      this.selectedPrice = params['price'] || '';

      this.searchCourses();
    });
    this.getCategories();
  }

  searchCourses() {
    const params: any = {};

    if (this.searchTerm) {
      params.name = this.searchTerm;
    }

    if (this.selectedTag) {
      params.tag = this.selectedTag;
    }

    if (this.selectedCategory) {
      params.category = this.selectedCategory;
    }

    if (this.selectedPrice) {
      params.price = this.selectedPrice;
    }

    // Vérifiez si des paramètres de recherche ont été fournis
    if (Object.keys(params).length > 0) {
      this.courService.searchCours(params).subscribe(courses => {
        this.cours = courses;
        // Rediriger vers la route appropriée si nécessaire
        this.router.navigate(['/cours'], {queryParams: params});
      });
    } else {
      // Si aucun paramètre n'est fourni, vous pouvez charger tous les cours ou afficher un message
      this.loadCours();
    }
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
