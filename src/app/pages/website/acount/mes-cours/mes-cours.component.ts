import {Component, OnInit, Renderer2} from '@angular/core';
import {UserService} from "../../../../services/user/user.service";
import {CourService} from "../../../../services/cour/cour.service";
import {Cour} from "../../../../model/cour.model";
import {Router} from "@angular/router";
import {InscriptionService} from "../../../../services/inscription/inscription.service";
import {AuthService} from "../../../../services/login/auth.service";
import {Inscription} from "../../../../model/inscription.model";
import {environment} from "../../../../../environments/environment";
import {AppUser} from "../../../../model/user.model";

@Component({
  selector: 'app-mes-cours',
  templateUrl: './mes-cours.component.html',
  styleUrl: './mes-cours.component.css'
})
export class MesCoursComponent implements OnInit {
  cours: Cour[] = [];
  inscriptions: Inscription[] = [];
  user!: AppUser;
  protected readonly environment = environment;

  constructor(private inscriptionService: InscriptionService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadUser();
    this.getCours();
    this.getInscriptions();

  }

  loadUser() {
    this.user = this.authService.authenticatedUser;
  }

  getInscriptions(): void {
    this.inscriptionService.getInscriptions().subscribe(
      data => {
        this.inscriptions = data
      },
      error => {
        console.log(error);
      }
    )
  }

  getCours() {

    const email = this.user.email;
    if (email !== null || email == "") {
      this.inscriptionService.getInscriptionsByUser(email).subscribe(
        data => {
          for (let inscription of data) {
            this.cours.push(inscription.cour);
          }
        },
        error => {
          console.log(error);
        }
      )
    }
  }
}
