import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {Video} from "../../../../model/video.model";
import {VideoService} from "../../../../services/video/video.service";
import {AuthService} from "../../../../services/login/auth.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Categorie} from "../../../../model/categorie.model";
import {CategorieService} from "../../../../services/categorie/categorie.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent implements OnInit {

  protected readonly environment = environment;
  public searchTerm: string = "";
  allVideos!: Video[];
  startDate: Date = new Date();
  endDate: Date = new Date();
  categories: Categorie[] = [];
  categorieNom: string = '';

  constructor(private videoService: VideoService, private categorieService: CategorieService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.refreshFilter();
    this.getCategories();
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

  search(): void {
    if (this.searchTerm.trim() !== '') {
      this.videoService.searchVideo(this.searchTerm).subscribe(
        data => {
          this.allVideos = data;
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.allVideos = [];

    }
  }

  getCategories() {
    this.categorieService.getCategories().subscribe(
      data => {
        this.categories = data
      },
      error => {
        console.log('No Categories Found', error);
      }
    )
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.allVideos = [];
  }

  refreshFilter() {
    this.route.paramMap.subscribe(params => {
      const pathSegment = this.route.snapshot.url[1]?.path;
      if (pathSegment === 'categorie') {
        this.categorieNom = params.get('categorieNom') ?? '';
        this.videoService.getVideosByCategorie(this.categorieNom).subscribe(
          data => {
            this.allVideos = data;
          },
          error => {
            console.log(error);
          }
        )
      } else {
        this.getVideos();
      }
    });
  }


}
