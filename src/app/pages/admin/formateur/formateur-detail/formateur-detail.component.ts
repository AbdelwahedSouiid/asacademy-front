import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormateurService} from "../../../../services/formateur/formateur.service";
import {Formateur} from "../../../../model/formateur.model";

@Component({
  selector: 'app-formateur-detail',
  templateUrl: './formateur-detail.component.html',
  styleUrl: './formateur-detail.component.css'
})
export class FormateurDetailComponent implements OnInit {
  formateur!: Formateur;

  constructor(
    private route: ActivatedRoute,
    private formateurService: FormateurService
  ) { }

  ngOnInit(): void {
    this.getFormateur();
  }

  getFormateur(): void {
    const id = this.route.snapshot.paramMap.get('id');

  }
}
