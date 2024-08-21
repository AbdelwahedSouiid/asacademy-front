import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AppUser} from "../../../../model/user.model";
import {ConfirmDialogueComponent} from "../../../website/confirm-dialogue/confirm-dialogue.component";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent implements OnInit {

  listUsers!: AppUser[];

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.listUsers = data;
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  onDelete(user: AppUser): void {
    const dialogRef = this.dialog.open(ConfirmDialogueComponent, {
      width: '350px',
      data: {message: 'Are you sure you want to delete this user?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe(
          () => {
            console.log('User deleted successfully');
            this.getUsers();
          },
          error => {
            console.error('Error deleting user:', error);
          }
        );
      }
    });
  }

}
