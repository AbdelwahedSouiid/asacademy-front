import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddVideoComponent} from './add-video/add-video.component';
import {AllVideosComponent} from './all-videos/all-videos.component';
import {EditVideoComponent} from './edit-video/edit-video.component';
import {VideoDetailComponent} from './video-detail/video-detail.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {VideoRoutingModule} from "./video-routing.module";


@NgModule({
  declarations: [
    AddVideoComponent,
    AllVideosComponent,
    EditVideoComponent,
    VideoDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    VideoRoutingModule
  ]
})
export class VideoModule {
}
