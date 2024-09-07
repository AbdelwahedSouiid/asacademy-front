import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {Video} from "../../../../model/video.model";
import {VideoService} from "../../../../services/video/video.service";

import {ActivatedRoute, Router} from "@angular/router";
import {Categorie} from "../../../../model/categorie.model";
import {CategorieService} from "../../../../services/categorie/categorie.service";
import {PaiementType} from "../../../../model/cour.model";

interface SearchParams {
  titre?: string;
  category?: string;
  tag?: string;
}

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent implements OnInit {

  protected readonly environment = environment;

  params: SearchParams = {};

  allVideos!: Video[];
  categories: Categorie[] = [];

  showFilters: boolean = true;

  constructor(private videoService: VideoService, private categorieService: CategorieService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.params.category = params['category'] || '';
      this.params.titre = params['titre'] || '';
      this.search();
    });
    this.getCategories();
  }

  search(): void {
    if (Object.keys(this.params).length > 0) {
      this.videoService.searchVideo(this.params).subscribe(videos => {
        this.allVideos = videos;
      });
    } else {
      this.getVideos();
    }
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
    this.params = {}; // Clear the search params
    this.getVideos();
    this.router.navigate(['/videos']);
  }

  onSearchInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.params.titre = input;

    // Update queryParams in the URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {name: this.params.titre}, // update only the 'name' query param
      queryParamsHandling: 'merge' // merge with the existing query params
    });

    this.search();
  }


  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}
