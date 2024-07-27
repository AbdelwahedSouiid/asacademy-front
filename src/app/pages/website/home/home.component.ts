import {AfterViewInit, Component, OnInit, AfterViewChecked} from '@angular/core';
import {CourService} from '../../../services/cour/cour.service';
import {Cour} from "../../../model/cour.model";
import {CategorieService} from "../../../services/categorie/categorie.service";
import {Categorie} from "../../../model/categorie.model";

declare var $: any; // Declare jQuery

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  allCourses!: Cour[];
  allCategories!: Categorie[];
  carouselInitialized = false;

  constructor(protected courService: CourService, private categoryService: CategorieService) {
  }

  ngOnInit(): void {
    this.getCours();
    this.getCategories();
  }


  ngAfterViewChecked() {
    if (this.allCourses.length > 0 && !this.carouselInitialized) {
      this.initializeCarousel();
      this.carouselInitialized = true;
    }
  }

  private getCategories() {

    this.categoryService.getCategories().subscribe(
      categories => {
        this.allCategories = categories;
      }, error => {
        console.log('No Categories Found', error);
      }
    )
  }

  private getCours(): void {
    this.courService.getCours().subscribe(
      cours => {
        this.allCourses = cours;
      },
      error => {
        console.log(error);
      }
    );
  }

  private initializeCarousel(): void {

    $(".latest-news-carousel").owlCarousel({
      items: 4,
      loop: true,
      margin: 25,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 3000,
      navText: [
        '<i class="bi bi-arrow-left "></i>',
        '<i class="bi bi-arrow-right"></i>'
      ],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        900: {
          items: 3
        },
        1200: {
          items: 4
        }
      }
    });
  }

}
