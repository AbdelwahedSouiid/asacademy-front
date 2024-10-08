import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/login/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {

  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
