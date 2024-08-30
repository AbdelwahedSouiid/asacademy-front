import {Component, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  activeLink: string = "";

  constructor(private renderer: Renderer2, private router: Router) {
  }

  ngOnInit(): void {
    this.loadResources();
    this.setActiveLink();
  }

  setActiveLink() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const link = event.urlAfterRedirects.split('/');
        this.activeLink = link[2];
      }
    })
  }

  loadResources() {
    // Load CSS
    this.loadStyle('assets/admin-template/vendors/feather/feather.css');
    this.loadStyle('assets/admin-template/vendors/ti-icons/css/themify-icons.css');
    this.loadStyle('assets/admin-template/vendors/css/vendor.bundle.base.css');
    // this.loadStyle('assets/admin-template/vendors/datatables.net-bs4/dataTables.bootstrap4.css');
    this.loadStyle('assets/admin-template/js/select.dataTables.min.css');
    this.loadStyle('assets/admin-template/css/vertical-layout-light/style.css');
    //style for form page
    this.loadStyle('assets/admin-template/vendors/select2/select2.min.css');
    this.loadStyle('assets/admin-template/vendors/select2-bootstrap-theme/select2-bootstrap.min.css');


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
    //script for form page
    this.loadScript('assets/admin-template/js/select2.js');
    this.loadScript('assets/admin-template/js/file-upload.js');

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
