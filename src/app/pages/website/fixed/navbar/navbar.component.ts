import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/login/auth.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {CategorieService} from "../../../../services/categorie/categorie.service";
import {Categorie} from "../../../../model/categorie.model";
import {environment} from "../../../../../environments/environment";
import {Cour} from "../../../../model/cour.model";
import {CourService} from "../../../../services/cour/cour.service";
import {AppUser} from "../../../../model/user.model";
import {UserService} from "../../../../services/user/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  protected readonly environment = environment;
  cours: Cour[] = [];
  categories: Categorie[] = [];
  user!: AppUser;

  activeLink: string = 'home';
  activeNavbar: number = 1;
  secondActiveLink!: string;

  searchTerm: string = '';
  selectedCategory: string = '';
  params: any = {};

  constructor(public authService: AuthService,
              private router: Router,
              private categorieService: CategorieService,
              public courService: CourService) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.loadUser();
    this.setActiveLink()
  }

  searchCourses() {
    const params: any = {};
    let searchTerm = this.searchTerm.trim();

    // Séparer les tags et mots-clés
    const keywords = searchTerm.split(' ').filter(term => !term.startsWith('#'));
    const tags = searchTerm.split(' ').filter(term => term.startsWith('#'));

    // Mettre à jour les paramètres de recherche
    if (keywords.length > 0) {
      params.name = keywords.join(' ');
    }

    if (this.selectedCategory) {
      params.category = this.selectedCategory;
    }

    if (tags.length > 0) {
      params.tag = tags.join(',');
    }

    if (Object.keys(params).length > 0) {
      this.courService.searchCours(params).subscribe(courses => {
        this.cours = courses;
      });
    } else {
      this.cours = [];
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.cours = [];
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  loadUser(): void {
    this.user = this.authService.authenticatedUser;
  }

  setActiveLink(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const link = event.urlAfterRedirects.split('/');
        if (link[2]) {
          this.activeNavbar = 2;
          this.activeLink = link[1];
          this.secondActiveLink = link[2];
        } else {
          this.activeNavbar = 1;
          this.activeLink = link[1];
        }
      }
    });
  }
}
