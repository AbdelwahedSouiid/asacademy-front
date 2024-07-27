import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {RegisterService} from "../../../services/register/register.service";
import {AppUser} from "../../../model/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  formRegister: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      photo: ['', Validators.required],
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
        if (this.selectedFile) {
          this.registerService.uploadImage(this.selectedFile, data.id).subscribe({
            next: () => {
              console.log('Image uploaded successfully');
              this.router.navigateByUrl('/login');
            },
            error: err => {
              console.error('Image upload failed', err);
            }
          });
        } else {
          this.router.navigateByUrl('/login');
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onfileClick(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }


}
