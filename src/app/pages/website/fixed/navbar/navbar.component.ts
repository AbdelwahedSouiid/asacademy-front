import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/login/auth.service";
import {Router} from "@angular/router";
import {CategorieService} from "../../../../services/categorie/categorie.service";
import {Categorie} from "../../../../model/categorie.model";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  photo!: string;
  username!: string | null;
  categories: Categorie[] = [];

  constructor(public authService: AuthService,
              private router: Router,
              private categorieService: CategorieService) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProfile();
  }

  getProfile() {
    this.photo = `${environment.url}/load/PhotoUser/${this.authService.photo}`
    this.username = this.authService.username;
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
}
