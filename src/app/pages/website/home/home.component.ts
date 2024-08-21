import {AfterViewInit, Component, OnInit, AfterViewChecked} from '@angular/core';
import {CourService} from '../../../services/cour/cour.service';
import {Cour} from "../../../model/cour.model";
import {CategorieService} from "../../../services/categorie/categorie.service";
import {Categorie} from "../../../model/categorie.model";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {Video} from "../../../model/video.model";
import {VideoService} from "../../../services/video/video.service";
import {Blog} from "../../../model/blog.model";
import {BlogService} from "../../../services/blog/blog.service";
import {AuthService} from "../../../services/login/auth.service";


declare var $: any; // Declare jQuery

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  protected readonly environment = environment;
  allCourses!: Cour[];
  allVideos!: Video[];
  allBlogs!: Blog[];
  allCategories!: Categorie[];
  pathImg!: string;
  private blogsCarouselInitialized = false;
  private coursesCarouselInitialized = false;
  private videosCarouselInitialized = false;

  constructor(public courService: CourService,
              private categoryService: CategorieService,
              private router: Router,
              private videoService: VideoService,
              private blogService: BlogService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getCours();
    this.getCategories();
    this.getVideos();
    this.getBlogs();
  }


  ngAfterViewChecked() {
    if (this.allCourses.length > 0 && !this.coursesCarouselInitialized) {
      this.initializeCarousel();
      this.coursesCarouselInitialized = true;
    }
    if (this.allVideos.length > 0 && !this.videosCarouselInitialized) {
      this.initializeVideoCarousel();
      this.videosCarouselInitialized = true;
    }
    if (this.allBlogs.length > 0 && !this.blogsCarouselInitialized) {
      this.initializeBlogCarousel();
      this.blogsCarouselInitialized = true;
    }
  }

  getBlogs(): void {
    this.blogService.getBlogs(true).subscribe(
      data => {
        this.allBlogs = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  getVideos(): void {
    this.videoService.getVideos().subscribe(
      data => {
        this.allVideos = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
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

  private initializeVideoCarousel(): void {
    console.log("Initializing Video Carousel");
    $(".video-carousel").owlCarousel({
      items: 4,
      loop: true,
      margin: 30,
      nav: true,
      dots: true,
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

  private initializeBlogCarousel(): void {
    console.log("Initializing Blog Carousel");
    $(".blog-carousel").owlCarousel({
      items: 1,
      loop: true,
      margin: 30,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 3000,
      responsive: {
        0: {
          items: 1
        }
      }
    });
  }
}

