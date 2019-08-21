import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { SidenavService } from '../../services/components/sidenav.service';
import { AppLoginComponent } from './../app-login/app-login.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './app-tool-bar.component.html',
  styleUrls: ['./app-tool-bar.component.css']
})
export class AppToolBarComponent implements OnInit {
  currentUrl: string;
  user: Observable<firebase.User>;
  dialogRef: MatDialogRef<AppLoginComponent>;
  inSmallScreen: boolean;

  constructor(
    private translate: TranslateService,
    public breakpointObserver: BreakpointObserver,
    private sidenavService: SidenavService,
    public dialog: MatDialog,
    public au: AngularFireAuth
  ) { }

  ngOnInit() {
    this.user = this.au.authState;
    this.breakpointObserver
    .observe(['(min-width: 600px)'])
    .subscribe((state: BreakpointState) => {
      this.inSmallScreen = !state.matches;
    });
  }

  openDialogLogin(): void {
    this.dialogRef = this.dialog.open(AppLoginComponent);
  }

  logout() {
    if (confirm('"Está seguro de querer abandonar la aplicación')) {
      this.au.auth.signOut();
    }
  }

  toggleAppSidenav() {
    this.sidenavService.toggle();
  }


}
