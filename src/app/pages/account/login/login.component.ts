import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/login/auth.service";
import {Route, Router} from "@angular/router";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formLogin! : FormGroup;
  constructor(private fb:FormBuilder ,private authService : AuthService ,private router:Router , private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadResources();
    this.formLogin = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control(""),
    })
  }

  handleLogin(){
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    this.authService.login(username,password).subscribe(
      {
        next: data => {
          this.authService.loadProfile(data);
          this.router.navigateByUrl('/admin');
        },
        error: err => {
          console.log(err);
        }
      }
    )


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
