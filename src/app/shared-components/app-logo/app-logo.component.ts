import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-logo',
  templateUrl: './app-logo.component.html',
  styleUrls: ['./app-logo.component.css']
})
export class AppLogoComponent implements OnInit {
  inSmallScreen: boolean;

  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.breakpointObserver
    .observe(['(min-width: 600px)'])
    .subscribe((state: BreakpointState) => {
      this.inSmallScreen = !state.matches;
    });
  }

}
