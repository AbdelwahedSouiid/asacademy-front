import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../services/login/auth.service";
import {Router} from "@angular/router";
import {RegisterService} from "../../../services/register/register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{



  formLogin! : FormGroup;
  constructor(private fb:FormBuilder ,private registerService: RegisterService ,private router:Router , private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadResources();

  }

  loadResources() {
    // Load CSS
    this.loadStyle('assets/admin-template/vendors/feather/feather.css');
    this.loadStyle('assets/admin-template/vendors/ti-icons/css/themify-icons.css');
    this.loadStyle('assets/admin-template/vendors/css/vendor.bundle.base.css');
    this.loadStyle('assets/admin-template/vendors/datatables.net-bs4/dataTables.bootstrap4.css');
    this.loadStyle('assets/admin-template/js/select.dataTables.min.css');
    this.loadStyle('assets/admin-template/css/vertical-layout-light/style.css');
    this.loadStyle('assets/admin-template/images/favicon.png'); // If needed as link tag

    // Load JS
    this.loadScript('assets/admin-template/vendors/js/vendor.bundle.base.js');
    this.loadScript('assets/admin-template/vendors/chart.js/Chart.min.js');
    this.loadScript('assets/admin-template/vendors/datatables.net/jquery.dataTables.js');
    this.loadScript('assets/admin-template/vendors/datatables.net-bs4/dataTables.bootstrap4.js');
    this.loadScript('assets/admin-template/js/dataTables.select.min.js');
    this.loadScript('assets/admin-template/js/off-canvas.js');
    this.loadScript('assets/admin-template/js/hoverable-collapse.js');
    this.loadScript('assets/admin-template/js/template.js');
    this.loadScript('assets/admin-template/js/settings.js');
    this.loadScript('assets/admin-template/js/todolist.js');
    this.loadScript('assets/admin-template/js/dashboard.js');
    this.loadScript('assets/admin-template/js/Chart.roundedBarCharts.js');
  }

  loadStyle(href: string) {
    const linkElement = this.renderer.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('href', href);
    this.renderer.appendChild(document.head, linkElement);
  }

  loadScript(src: string) {
    const scriptElement = this.renderer.createElement('script');
    scriptElement.setAttribute('src', src);
    scriptElement.setAttribute('async', '');
    scriptElement.setAttribute('defer', '');
    this.renderer.appendChild(document.body, scriptElement);
  }
}
