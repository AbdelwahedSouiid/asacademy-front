import {Component, OnInit} from '@angular/core';
import {Video} from "../../../../model/video.model";
import {VideoService} from "../../../../services/video/video.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/login/auth.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css'
})
export class WatchComponent implements OnInit {

  protected readonly environment = environment;
  allVideos!: Video[];
  currentVideo!: Video;

  constructor(private videoService: VideoService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.getVideos();
    this.loadCurrentVideo();
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

  loadCurrentVideo(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const idVideo = params.get('id');
      console.log('Video ID:', idVideo); // Vérifiez que vous obtenez l'ID attendu
      if (idVideo) {
        this.videoService.detail(idVideo).subscribe(video => {
          this.currentVideo = video;
          console.log('Current Video:', this.currentVideo);
        }, error => {
          console.error('Error loading video details:', error);
        });
      } else {
        console.error('No video ID found in route parameters');
      }
    });
  }

}
