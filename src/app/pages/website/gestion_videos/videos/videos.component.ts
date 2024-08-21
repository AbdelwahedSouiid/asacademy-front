import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {Video} from "../../../../model/video.model";
import {VideoService} from "../../../../services/video/video.service";
import {AuthService} from "../../../../services/login/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent implements OnInit {

  protected readonly environment = environment;

  allVideos!: Video[];

  constructor(private videoService: VideoService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.getVideos();
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


}
