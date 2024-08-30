import {AfterViewInit, Component, OnInit, Renderer2,} from '@angular/core';
import {FormateurService} from "../../../services/formateur/formateur.service";
import {Formateur} from "../../../model/formateur.model";
import Swiper from "swiper";


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit, AfterViewInit {
  formateurs: Formateur[] = [];

  constructor(private formateurService: FormateurService) {
  }

  ngOnInit(): void {
    this.getFormateurs();
  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  getFormateurs(): void {
    this.formateurService.getFormateurs().subscribe(
      data => {
        this.formateurs = data
      },
      error => console.log(error)
    )

  }

  initSwiper(): void {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 40
        }
      }
    });
  }
}
