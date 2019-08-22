import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SidenavService } from './services/components/sidenav.service';
import { MatSidenav } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {

  @ViewChild('appsidenav', { static: true }) public sidenav: MatSidenav;
  currentUrl: string;
  currentLang: string;
  listLanguages = [
    { id: 'en', name: 'English' },
    { id: 'fr', name: 'French' },
    { id: 'ca', name: 'Catalan' },
    { id: 'es', name: 'Spanish' }
  ];

  constructor(router: Router,
              private sidenavService: SidenavService,
              private translate: TranslateService) {

    this.translate.addLangs(this.listLanguages.map(l => l.id));
    this.translate.setDefaultLang('es');

    const browserLang = this.translate.getBrowserLang();
    this.currentLang = browserLang.match(/en|fr|ca|es/) ? browserLang : 'en';
    this.translate.use(this.currentLang);

    router.events.subscribe((_: NavigationEnd) => {
      if (_.url) {
        if (_.url.lastIndexOf('/') > 0) {
          this.currentUrl = _.url.substring(0, _.url.lastIndexOf('/'));
        } else {
          this.currentUrl = _.url;
        }
        console.log('this.currentUrl = ', this.currentUrl);
      }
    });
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    this.sidenavService.setPositionLeft();
  }

  changeLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
  }


}
