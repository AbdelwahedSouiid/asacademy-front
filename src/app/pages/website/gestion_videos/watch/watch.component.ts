import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {Video} from "../../../../model/video.model";
import {VideoService} from "../../../../services/video/video.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css'
})
export class WatchComponent implements OnInit {


  allVideos!: Video[];
  currentVideo!: Video;

  constructor(private videoService: VideoService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getVideos();
    this.loadCurrentVideo();
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

  loadCurrentVideo(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const idVideo = params.get('id');
      if (idVideo) {
        this.videoService.detail(idVideo).subscribe(video => {
          this.currentVideo = video;
        }, error => {
          console.error('Error loading video details:', error);
        });
      } else {
        console.error('No video ID found in route parameters');
      }
    });
  }

  protected readonly environment = environment;
}
