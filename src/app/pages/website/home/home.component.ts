import {Component, OnInit, AfterViewChecked, AfterViewInit} from '@angular/core';
import {CourService} from '../../../services/cour/cour.service';
import {Cour} from "../../../model/cour.model";
import {CategorieService} from "../../../services/categorie/categorie.service";
import {Categorie} from "../../../model/categorie.model";

import {environment} from "../../../../environments/environment";
import {Video} from "../../../model/video.model";
import {VideoService} from "../../../services/video/video.service";
import {Blog} from "../../../model/blog.model";
import {BlogService} from "../../../services/blog/blog.service";
import {AuthService} from "../../../services/login/auth.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  protected readonly environment = environment;
  allCourses!: Cour[];
  allVideos!: Video[];
  allBlogs!: Blog[];
  allCategories!: Categorie[];


  constructor(public courService: CourService,
              private categoryService: CategorieService,
              private videoService: VideoService,
              private blogService: BlogService,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.getCours();
    this.getCategories();
    this.getVideos();
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogService.getBlogs(true).subscribe(
      data => {
        this.allBlogs = data;
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


}

