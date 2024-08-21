import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogueComponent} from "../../../website/confirm-dialogue/confirm-dialogue.component";
import {FormateurService} from "../../../../services/formateur/formateur.service";
import {Formateur} from "../../../../model/formateur.model";

@Component({
  selector: 'app-all-formateur',
  templateUrl: './all-formateur.component.html',
  styleUrl: './all-formateur.component.css'
})
export class AllFormateurComponent implements OnInit {

  listFormateurs!: Formateur[];

  constructor(private FormateurService: FormateurService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getFormateurs();
  }

  getFormateurs(): void {
    this.FormateurService.getFormateurs().subscribe(
      data => {
        this.listFormateurs = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  onDelete(Formateur: Formateur): void {
    const dialogRef = this.dialog.open(ConfirmDialogueComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.FormateurService.deleteFormateur(Formateur.id).subscribe(
          next => {
            // Supprimer le Formateur de la liste localement
            this.listFormateurs = this.listFormateurs.filter(b => b.id !== Formateur.id);
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
}
