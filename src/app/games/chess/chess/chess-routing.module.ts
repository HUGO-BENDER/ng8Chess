import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChessComponent } from '../chess/chess.component';


const routes: Routes = [
  {
    path: 'games/chess/:id/:user',
    component: ChessComponent
  }, {
    path: '**',
    component: ChessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChessRoutingModule { }
