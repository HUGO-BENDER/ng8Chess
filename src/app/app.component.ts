import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SidenavService } from './services/components/sidenav.service';
import { MatSidenav } from '@angular/material';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {

  @ViewChild('appsidenav', { static: true }) public sidenav: MatSidenav;
  currentUrl = '/home';
  currentLang: string;
  loading = false;
  listLanguages = [
    { id: 'en', name: 'English' },
    { id: 'fr', name: 'French' },
    { id: 'ca', name: 'Catalan' },
    { id: 'es', name: 'Spanish' }
  ];

  constructor(private router: Router,
              private sidenavService: SidenavService,
              private translate: TranslateService) {

    this.translate.addLangs(this.listLanguages.map(l => l.id));
    this.translate.setDefaultLang('es');

    const browserLang = this.translate.getBrowserLang();
    this.currentLang = browserLang.match(/en|fr|ca|es/) ? browserLang : 'en';
    this.translate.use(this.currentLang);

    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd: {
          const e = <NavigationEnd> event ;
          if (e.url) {
            if (e.url.lastIndexOf('/') > 0) {
              this.currentUrl = e.url.substring(0, e.url.lastIndexOf('/')).trim();
            } else {
              this.currentUrl = e.url.trim();
            }
            console.log('this.currentUrl = [', this.currentUrl,']');
          }
          this.loading = false;
          break;
        }
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
      console.log('this.loading =', this.loading );
    });
  }

  checkIfShowHeaderAndFooter(): boolean {
    return !this.currentUrl.startsWith('/game');
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
