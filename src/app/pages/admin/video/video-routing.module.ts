import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AddVideoComponent} from "./add-video/add-video.component";
import {AllVideosComponent} from "./all-videos/all-videos.component";
import {VideoDetailComponent} from "./video-detail/video-detail.component";
import {EditVideoComponent} from "./edit-video/edit-video.component";


const routes: Routes = [
  {path: 'add-Video', component: AddVideoComponent},
  {path: 'all-Videos', component: AllVideosComponent},
  {path: 'Video-detail/:id', component: VideoDetailComponent},
  {path: 'edit-Video/:id', component: EditVideoComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule {
}
