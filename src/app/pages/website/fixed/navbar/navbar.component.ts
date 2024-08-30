import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/login/auth.service";
import {NavigationEnd, Router} from "@angular/router";
import {CategorieService} from "../../../../services/categorie/categorie.service";
import {Categorie} from "../../../../model/categorie.model";
import {environment} from "../../../../../environments/environment";
import {Cour} from "../../../../model/cour.model";
import {CourService} from "../../../../services/cour/cour.service";
import {AppUser} from "../../../../model/user.model";

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

  public searchTerm: string = "";
  activeLink: string = 'home';
  activeNavbar: number = 1;
  secondActiveLink!: string;


  constructor(public authService: AuthService,
              private router: Router,
              private categorieService: CategorieService,
              public courService: CourService
  ) {
  }


  search(): void {
    if (this.searchTerm.trim() !== '') {
      this.courService.searchCour(this.searchTerm).subscribe(
        data => {
          this.cours = data;

        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.cours = [];
    }
  }

  ngOnInit(): void {
    this.getCategories();
    this.loadUser();
    this.setActiveLink()
  }

  setActiveLink(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const link = event.urlAfterRedirects.split('/');
        console.log(link);
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


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
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

  loadUser(): void {
    this.user = this.authService.authenticatedUser;
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.cours = [];
  }
}
