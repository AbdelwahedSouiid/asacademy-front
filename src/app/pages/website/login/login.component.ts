import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/login/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private renderer: Renderer2) {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  handleLogin(): void {
    const username = this.formLogin.value.username;
    const password = this.formLogin.value.password;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.authService.loadProfile(data);
        if (this.authService.roles.includes("USER")) {
          // Après authentification réussie
          const redirectUrl = localStorage.getItem('redirectUrl');
          if (redirectUrl) {
            localStorage.removeItem('redirectUrl');
            this.router.navigateByUrl(redirectUrl);
          } else {
            this.router.navigateByUrl('/home');
          }
        } else {
          this.router.navigateByUrl('/admin');
        }
      },
      error: err => {
        this.errorMessage = err.message;
      }
    });
  }


}
