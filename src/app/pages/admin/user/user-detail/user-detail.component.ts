import {Component, OnInit, Renderer2} from '@angular/core';
import {UserService} from "../../../../services/user/user.service";
import {AppUser} from "../../../../model/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Blog} from "../../../../model/blog.model";
import {ConfirmDialogueComponent} from "../../../website/confirm-dialogue/confirm-dialogue.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {

  user!: AppUser;

  constructor(private router: Router, private userService: UserService, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadCurrentUser();
  }


  loadCurrentUser(): void {
    // Récupération de l'ID depuis les paramètres de l'URL
    this.activatedRoute.paramMap.subscribe(params => {
      let idUser = params.get('id')!;
      this.userService.getUser(idUser).subscribe(user => {
        this.user = user;
      });
    });
  }

  deleteUser(user: AppUser) {
    const dialogRef = this.dialog.open(ConfirmDialogueComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe(
          next => {
            this.router.navigateByUrl("/admin/blogs/all-Blogs")
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

}
