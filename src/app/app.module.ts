// --Modules in @angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// -- App components
import { AppRoutingModule } from './components/app-routing/app-routing.module';
import { AppComponent } from './app.component';

// --Material
import { AppMaterialModule } from './components/app-material/app-material.module';

// --Translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// --Firebase & Firebase UI
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { environment } from '../environments/environment';

// --SweetAlert2
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// --Components and Pages
import { AppSharedModule } from './shared-components/app-shared.module'
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
import { CrazyChessComponent } from './games/crazy-chess/crazy-chess/crazy-chess.component';
import { ChinkerComponent } from './games/chinker/chinker/chinker.component';
import { FlowComponent } from './games/flow/flow/flow.component';
import { ChessInfoComponent } from './games/chess/chess-info/chess-info.component';
import { CrazyChessInfoComponent } from './games/crazy-chess/crazy-chess-info/crazy-chess-info.component';
import { ChinkerInfoComponent } from './games/chinker/chinker-info/chinker-info.component';
import { FlowInfoComponent } from './games/flow/flow-info/flow-info.component';
import { ChessNewGameComponent } from './games/chess/chess-new-game/chess-new-game.component';
import { CrazyChessNewGameComponent } from './games/crazy-chess/crazy-chess-new-game/crazy-chess-new-game.component';
import { ChinkerNewGameComponent } from './games/chinker/chinker-new-game/chinker-new-game.component';


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
    CrazyChessComponent,
    ChinkerComponent,
    FlowComponent,
    ChessInfoComponent,
    CrazyChessInfoComponent,
    ChinkerInfoComponent,
    FlowInfoComponent,
    ChessNewGameComponent,
    CrazyChessNewGameComponent,
    ChinkerNewGameComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppSharedModule,
    AppRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgxAuthFirebaseUIModule.forRoot(environment.firebaseConfig),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      confirmButtonClass: 'mat-raised-button mat-primary',
      cancelButtonClass: 'mat-raised-button swal-margin-rigth',
      reverseButtons: true
    })
  ],
  entryComponents: [
    AppLoginComponent,
    ChessInfoComponent,
    ChessNewGameComponent,
    CrazyChessInfoComponent,
    CrazyChessNewGameComponent,
    ChinkerInfoComponent,
    ChinkerNewGameComponent,
    FlowInfoComponent
  ],
  providers: [
    SidenavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
