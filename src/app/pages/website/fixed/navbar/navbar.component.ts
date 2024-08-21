import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/login/auth.service";
import {NavigationEnd, Router} from "@angular/router";
import {CategorieService} from "../../../../services/categorie/categorie.service";
import {Categorie} from "../../../../model/categorie.model";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  activeLink: string = '/home';
  searchTerm: string = '';

  categories: Categorie[] = [];


  constructor(public authService: AuthService,
              private router: Router,
              private categorieService: CategorieService) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.setActiveLink()
  }

  setActiveLink(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeLink = event.urlAfterRedirects;
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

  protected readonly environment = environment;
}
