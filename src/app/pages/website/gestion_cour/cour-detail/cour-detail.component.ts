import {Component, OnInit} from '@angular/core';
import {CourService} from "../../../../services/cour/cour.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Cour} from "../../../../model/cour.model";

import {environment} from "../../../../../environments/environment";
import {AvisService} from "../../../../services/avis/avis.service";

import {InscriptionService} from "../../../../services/inscription/inscription.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Avis} from "../../../../model/avis.model";
import {AppUser} from "../../../../model/user.model";
import {UserService} from "../../../../services/user/user.service";
import {Blog} from "../../../../model/blog.model";
import {Inscription} from "../../../../model/inscription.model";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../services/login/auth.service";


@Component({
  selector: 'app-cour-detail',
  templateUrl: './cour-detail.component.html',
  styleUrl: './cour-detail.component.css'
})

export class CourDetailComponent implements OnInit {
  currentCour!: Cour;
  currentUser!: AppUser;
  environment = environment;
  avisForm!: FormGroup;
  avisList!: Avis[];

  constructor(public courService: CourService,
              private authService: AuthService,
              private avisService: AvisService,
              private userService: UserService,
              private inscriptionService: InscriptionService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router
  ) {
    this.avisForm = this.fb.group({
      comment: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadCurrentCour();
    this.loadCurrentUser();
  }

  loadCurrentCour(): void {
    // Récupération de l'ID depuis les paramètres de l'URL
    this.activatedRoute.paramMap.subscribe(params => {
      let idCour = params.get('id')!;
      this.courService.detail(idCour).subscribe(cour => {
        this.currentCour = cour;
      });
    });
  }

  loadCurrentUser(): void {
    const authUser = localStorage.getItem('authUser');
    const email = authUser ? JSON.parse(authUser).username : null;
    this.userService.getUser(email).subscribe({
      next: data => {
        this.currentUser = data;
      }
    })
  }

  loadAvis() {
    this.avisList = this.currentCour.avis;
  }

  handleAddAvis(): void {

    if (this.avisForm.invalid) {
      return console.log("invalid form");
      ;
    }
    const avis: Avis = {
      ...this.avisForm.value,
      user: this.currentUser,
    };
    if (this.authService.isAuthenticated) {
      this.avisService.addAvis(avis, this.currentCour.id).subscribe({
        next: (data) => {
          this.avisForm.reset();
          this.loadCurrentCour();
        },
        error: (err) => {
          // Traiter l'erreur, par exemple, afficher un message d'erreur
          console.error('Erreur lors de l\'ajout de l\'avis', err);
        }
      });
    } else {
      localStorage.setItem('redirectUrl', this.router.url);
      this.router.navigateByUrl('/login');
    }
  }

  inscrire(): void {
    // Création de l'objet Inscription complet
    const inscription: Inscription = {
      dateInscription: new Date(),
      user: this.currentUser,
      cour: this.currentCour,
    };
    if (this.authService.isAuthenticated) {
      this.inscriptionService.ajouterInscription(inscription).subscribe({
        next: () => {
          // Navigation vers la page des cours
          this.router.navigateByUrl('/mescours');
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de l\'inscription', err);
        }
      });
    } else {
      localStorage.setItem('redirectUrl', this.router.url);
      this.router.navigateByUrl('/login');
    }

  }


  /*iinitializeVoirPlus(): void {
    // Vous pouvez également appeler cette méthode dans ngAfterViewInit si nécessaire
    document.addEventListener("DOMContentLoaded", () => {
      const showMoreButtons = document.querySelectorAll(".show-more");

      showMoreButtons.forEach(button => {
        button.addEventListener("click", function () {
          // `this` ici fait référence au bouton cliqué
          const commentText = this.previousElementSibling;
          if (commentText && commentText.classList.contains("expanded")) {
            commentText.classList.remove("expanded");
            this.textContent = "Voir plus";
          } else if (commentText) {
            commentText.classList.add("expanded");
            this.textContent = "Voir moins";
          }
        });
      });
    });
  }*/

}
