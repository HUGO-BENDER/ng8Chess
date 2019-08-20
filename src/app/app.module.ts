// --Modules in @angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// -- App components
import { AppRoutingModule } from './components/app-routing/app-routing.module';
import { AppComponent } from './app.component';

// --Material
import { AppMaterialModule } from './components/app-material/app-material.module';

// --Translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// --SweetAlert2
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// --Components and Pages 
import { AppToolBarComponent } from './components/app-tool-bar/app-tool-bar.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppLoginComponent } from './components/app-login/app-login.component';
import { PageHomeComponent } from './components/page-home/page-home.component';
import { PageAboutComponent } from './components/page-about/page-about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PagePolicyPrivacyComponent } from './components/page-policy-privacy/page-policy-privacy.component';
import { PageServiceConditionsComponent } from './components/page-service-conditions/page-service-conditions.component';

// --Services
// import { MetadataService } from './services/firestore/metadata.service';
import { SidenavService } from './services/components/sidenav.service';


// -- GAMES :-)
import { ChessComponent } from './games/chess/chess/chess.component';
import { CrazyChessComponent } from './games/crazy-chess/crazy-chess/crazy-chess.component';
import { ChinkerComponent } from './games/chinker/chinker/chinker.component';
import { FlowComponent } from './games/flow/flow/flow.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    AppToolBarComponent,
    AppFooterComponent,
    AppLoginComponent,
    PageHomeComponent,
    PageAboutComponent,
    PageNotFoundComponent,
    PagePolicyPrivacyComponent,
    PageServiceConditionsComponent,
    ChessComponent,
    CrazyChessComponent,
    ChinkerComponent,
    FlowComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      confirmButtonClass: 'mat-raised-button mat-primary',
      cancelButtonClass: 'mat-raised-button swal-margin-rigth',
      reverseButtons: true
    })
  ],
  providers: [
    SidenavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
