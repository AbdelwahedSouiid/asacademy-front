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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      checkbox: [true],
    });
  }

  ngOnInit(): void {

  }

  handleLogin(): void {
    const email = this.formLogin.value.email;
    const password = this.formLogin.value.password;
    const checkboxValue = this.formLogin.value.checkbox;

    console.log('Checkbox Value:', checkboxValue);
    this.authService.login(email, password, checkboxValue).subscribe({
      next: data => {
        this.authService.loadProfile(data);
        const roles = this.authService.authenticatedUser.roles;
        if (roles.includes("USER")) {
          // Après authentification réussie
          const redirectUrl = localStorage.getItem('redirectUrl');
          if (redirectUrl) {
            localStorage.removeItem('redirectUrl');
            this.router.navigateByUrl(redirectUrl);
          } else {
            this.router.navigateByUrl('/home');
          }
        } else if (roles.includes("ADMIN")) {
          this.router.navigateByUrl('/admin');
        } else {
          console.log("aucun role trouvé")
        }
      },
      error: err => {
        this.errorMessage = err.message;
      }
    });
  }


}
