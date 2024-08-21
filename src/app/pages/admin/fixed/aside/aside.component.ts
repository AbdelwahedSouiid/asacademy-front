import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent implements OnInit {


  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }


  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
