import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/login/auth.service";
import {Router} from "@angular/router";
import {CategorieService} from "../../../../services/categorie/categorie.service";
import {Categorie} from "../../../../model/categorie.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  categories: any[] = [];

  constructor(public authService: AuthService,
              private router: Router,
              private categorieService: CategorieService) {
  }

  ngOnInit(): void {
    this.getCategories();
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
