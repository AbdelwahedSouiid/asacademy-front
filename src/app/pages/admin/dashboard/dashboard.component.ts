import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {CourService} from "../../../services/cour/cour.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private courService: CourService, private router: Router) {
  }

  ngOnInit(): void {

  }

}
