import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { SidenavService } from '../../services/components/sidenav.service';
import { AppLoginComponent } from './../app-login/app-login.component';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { FirebaseUIModule } from 'firebaseui-angular';
// import { Observable } from 'rxjs/Observable';
// import * as firebase from 'firebase/app';



@Component({
  selector: 'app-tool-bar',
  templateUrl: './app-tool-bar.component.html',
  styleUrls: ['./app-tool-bar.component.css']
})
export class AppToolBarComponent implements OnInit {
  currentUrl: string;
  // user: Observable<firebase.User>;
  dialogRef: MatDialogRef<AppLoginComponent>;

  constructor(
    private translate: TranslateService, 
    private sidenavService: SidenavService,
    public dialog: MatDialog  
    // public au: AngularFireAuth
  ) { }

  ngOnInit() {
     // --  // this.au.authState.subscribe(this.firebaseAuthChangeListener);
    // this.user = this.au.authState;
  }
 
  openDialogLogin(): void {
    this.dialogRef = this.dialog.open(AppLoginComponent);
  }

  // private firebaseAuthChangeListener(response) {
  //   if (response) {
  //     console.log('Logged in :) ');
  //   } else {
  //     console.log('Logged out :(');
  //   }
  // }

  logout() {
    if (confirm('"Está seguro de querer abandonar la aplicación')) {
      // this.au.auth.signOut();
    }
  }

  toggleAppSidenav() {
    this.sidenavService.toggle();
  }


}
