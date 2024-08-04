import {Component, OnInit, Renderer2} from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {


  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources() {
    // Load CSS
    this.loadStyle('https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
    this.loadStyle('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Raleway:wght@100;600;800&display=swap');
    this.loadStyle('https://use.fontawesome.com/releases/v5.15.4/css/all.css');
    this.loadStyle('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css');

    this.loadStyle('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
    this.loadStyle('https://fonts.googleapis.com/icon?family=Material+Icons');
    this.loadStyle('assets/client-template/css/bootstrap.min.css');
    this.loadStyle('assets/client-template/css/style.css');

    // Load JS
    this.loadScript('https://buttons.github.io/buttons.js');
    this.loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js');
    this.loadScript('assets/client-template/js/main.js');


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
