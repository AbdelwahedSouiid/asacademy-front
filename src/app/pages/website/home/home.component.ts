import {Component, OnInit} from '@angular/core';
declare var $: any; // Déclarer jQuery
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit {

  ngOnInit(): void {
    // Initialisation d'Owl Carousel après que le DOM soit prêt
    $(document).ready(() => {
      $(".latest-news-carousel").owlCarousel({
        items: 4,
        loop: true,
        margin: 10,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
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
    });
  }
}
