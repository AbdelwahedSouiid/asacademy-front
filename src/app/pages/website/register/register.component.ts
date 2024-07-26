import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/login/auth.service";
import {Router} from "@angular/router";
import {RegisterService} from "../../../services/register/register.service";
import {AppUser} from "../../../model/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  formRegister!: FormGroup;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      photoUrl: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
  }

  handleRegister() {
    if (this.formRegister.invalid) {
      return;
    }
    const appUser: AppUser = this.formRegister.value;
    this.registerService.register(appUser).subscribe({
      next: data => {
        console.log('Register done');
        this.router.navigateByUrl('/login');
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
