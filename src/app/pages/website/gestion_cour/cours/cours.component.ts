import {Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CourService} from "../../../../services/cour/cour.service";
import {Cour} from "../../../../model/cour.model";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {environment} from "../../../../../environments/environment";
import {Categorie} from "../../../../model/categorie.model";

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class CoursComponent implements OnInit {

  protected readonly environment = environment;
  cours: any[] = [];

  constructor(private courService: CourService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadCours();
  }

  loadCours(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const categorieNom = params.get('categorieNom');
      if (categorieNom) {
        this.courService.getCoursByCategorie(categorieNom).subscribe(
          data => {
            this.cours = data;
            console.log('Filtered by category:', data);
          },
          err => {
            console.log(err);
          }
        );
      } else {
        this.courService.getCours().subscribe(
          data => {
            this.cours = data;
            console.log('All courses:', data);
          },
          err => {
            console.log(err);
          }
        );
      }
    });
  }
}



