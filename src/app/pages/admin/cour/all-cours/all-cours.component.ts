import {Component, OnInit} from '@angular/core';
import {CourService} from "../../../../services/cour/cour.service";
import {Router} from "@angular/router";
import {Cour} from "../../../../model/cour.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogueComponent} from "../../../website/confirm-dialogue/confirm-dialogue.component";

@Component({
  selector: 'app-all-cours',
  templateUrl: './all-cours.component.html',
  styleUrl: './all-cours.component.css'
})
export class AllCoursComponent implements OnInit {


  allCourses!: Cour[];

  constructor(private courService: CourService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getCours();
  }


  private getCours(): void {
    this.courService.getCours().subscribe(
      cours => {
        this.allCourses = cours;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteCourse(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogueComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.courService.delete(id).subscribe(() => {
          this.getCours();
        });
      }
    });

  }
}
