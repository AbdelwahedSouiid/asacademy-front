import {Component, OnInit} from '@angular/core';

import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogueComponent} from "../../../website/confirm-dialogue/confirm-dialogue.component";
import {Video} from "../../../../model/video.model";
import {VideoService} from "../../../../services/video/video.service";

@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrl: './all-videos.component.css'
})
export class AllVideosComponent implements OnInit {

  listVideos!: Video[];

  constructor(private VideoService: VideoService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos(): void {
    this.VideoService.getVideos().subscribe(
      data => {
        this.listVideos = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  onDelete(Video: Video): void {
    const dialogRef = this.dialog.open(ConfirmDialogueComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.VideoService.delete(Video.id).subscribe(
          next => {
            // Supprimer le Video de la liste localement
            this.listVideos = this.listVideos.filter(b => b.id !== Video.id);
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
}
