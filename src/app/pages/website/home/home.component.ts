import {AfterViewInit, Component, OnInit, AfterViewChecked} from '@angular/core';
import {CourService} from '../../../services/cour/cour.service';
import {Cour} from "../../../model/cour.model";

declare var $: any; // Declare jQuery

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  allCourses!: Cour[];
  carouselInitialized = false;

  constructor(private courService: CourService) {
  }

  ngOnInit(): void {
    this.getCours();
  }


  ngAfterViewChecked() {
    if (this.allCourses.length > 0 && !this.carouselInitialized) {
      this.initializeCarousel();
      this.carouselInitialized = true;
    }
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
      margin: 10,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 2000,
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
