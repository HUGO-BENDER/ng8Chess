import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedLang: string;
  listLanguages = [
    { id: 'en', name: 'English' },
    { id: 'fr', name: 'French' },
    { id: 'ca', name: 'Catalan' },
    { id: 'es', name: 'Spanish' }
  ];

  constructor(// router: Router,
    // private sidenavService: SidenavService
    private translate: TranslateService) {

    this.translate.addLangs(this.listLanguages.map(l => l.id));
    this.translate.setDefaultLang('es');

    const browserLang = this.translate.getBrowserLang();
    this.selectedLang = browserLang.match(/en|fr|ca|es/) ? browserLang : 'en';
    this.translate.use(this.selectedLang);

  }



}
