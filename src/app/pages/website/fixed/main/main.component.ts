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
    /** Load CSS **/

    // Google Web Fonts -->
    //this.loadStyle("https://fonts.googleapis.com")
    //  this.loadStyle("https://fonts.gstatic.com")
    // this.loadStyle("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Raleway:wght@100;600;800&display=swap")


    // Libraries Stylesheet

    // Template Stylesheet -->
    this.loadStyle("assets/client-template/css/style.css")


    /** Load JS **/
    //  this.loadScript('https://buttons.github.io/buttons.js');
    // this.loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js');
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
