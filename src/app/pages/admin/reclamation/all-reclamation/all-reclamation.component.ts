import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Reclamation} from "../../../../model/reclamation.model";
import {ReclamationService} from "../../../../services/reclamation/reclamation.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogueComponent} from "../../../website/confirm-dialogue/confirm-dialogue.component";

@Component({
  selector: 'app-all-reclamation',
  templateUrl: './all-reclamation.component.html',
  styleUrl: './all-reclamation.component.css'
})
export class AllReclamationComponent implements OnInit {

  allReclamations: Reclamation[] = [];

  constructor(private reclamationService: ReclamationService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getReclamations();
  }

  private getReclamations(): void {
    this.reclamationService.getReclamations().subscribe(
      data => {
        this.allReclamations = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteReclamation(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogueComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.reclamationService.deleteReclamation(id).subscribe(() => {
          this.getReclamations();
        });
      }
    });

  }

  protected readonly ReclamationService = ReclamationService;
}
