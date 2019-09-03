import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageHomeComponent } from '../page-home/page-home.component';
import { PageAboutComponent } from '../page-about/page-about.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { PagePolicyPrivacyComponent } from '../page-policy-privacy/page-policy-privacy.component';
import { PageServiceConditionsComponent } from '../page-service-conditions/page-service-conditions.component';
import { ChessComponent } from "../../games/chess/chess/chess.component"

const routes: Routes = [
  {
    path: '',
    component: PageHomeComponent
  }, {
    path: 'home',
    component: PageHomeComponent
  },
  {
    path: 'about',
    component: PageAboutComponent
  }, {
    path: 'policyprivacy',
    component: PagePolicyPrivacyComponent
  }, {
    path: 'serviceconditions',
    component: PageServiceConditionsComponent
  }, {
    path: 'games/chess/:id/:user',
    component: ChessComponent
  }, {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
