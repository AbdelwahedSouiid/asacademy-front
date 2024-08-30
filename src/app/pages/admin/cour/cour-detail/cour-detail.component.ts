import {Component, OnInit} from '@angular/core';
import {Cour} from "../../../../model/cour.model";
import {CourService} from "../../../../services/cour/cour.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmDialogueComponent} from "../../../website/confirm-dialogue/confirm-dialogue.component";
import {MatDialog} from "@angular/material/dialog";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-cour-detail',
  templateUrl: './cour-detail.component.html',
  styleUrl: './cour-detail.component.css'
})
export class CourDetailComponent implements OnInit {

  protected readonly environment = environment;
  course!: Cour;
  contentToShow: string = 'affiche';

  constructor(public courService: CourService, private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadCurrentCour();
  }

  loadCurrentCour(): void {
    // Récupération de l'ID depuis les paramètres de l'URL
    this.activatedRoute.paramMap.subscribe(params => {
      let idCour = params.get('id')!;
      this.courService.detail(idCour).subscribe(cour => {
        this.course = cour;
      });
    });
  }

  deleteCourse(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogueComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.courService.delete(id).subscribe(() => {

        });
      }
    });

  }

  showContent(contentType: string): void {
    this.contentToShow = contentType;
  }

}
