import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReclamationService} from "../../../services/reclamation/reclamation.service";
import {Cour} from "../../../model/cour.model";
import {UserService} from "../../../services/user/user.service";
import {AppUser} from "../../../model/user.model";
import {Avis} from "../../../model/avis.model";
import {Reclamation} from "../../../model/reclamation.model";
import {AuthService} from "../../../services/login/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  reclamationForm: FormGroup;
  currentUser!: AppUser;

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder, private reclamationService: ReclamationService, private userService: UserService) {
    this.reclamationForm = this.fb.group({
      sujet: ['', Validators.required],
      objet: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  handleAddReclamation(): void {
    if (this.reclamationForm.invalid) {
      return;
    }
    const reclamation: Reclamation = {
      ...this.reclamationForm.value,
      user: this.currentUser
    };

    console.log('verifier user', reclamation.user);

    this.reclamationService.addReclamation(reclamation).subscribe({
      next: (data) => {
        this.reclamationForm.reset();
      },
      error: (err) => {
        console.error('Erreur lors de reclamation add : ', err);
      }
    })
  }

  loadCurrentUser(): void {
    const authUser = localStorage.getItem('authUser');
    const email = authUser ? JSON.parse(authUser).email : null;
    this.userService.getUser(email).subscribe({
      next: data => {
        this.currentUser = data;
      }
    })
  }


}
