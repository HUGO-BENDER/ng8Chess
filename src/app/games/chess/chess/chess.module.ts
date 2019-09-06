import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChessRoutingModule } from './chess-routing.module';
import { ChessComponent } from '../chess/chess.component';

// import { FramepanzoomDirective } from '../chess/framepanzoom.directive';
// --Translate
import { TranslateModule } from '@ngx-translate/core';
// --Material
import { AppMaterialModule } from '../../../components/app-material/app-material.module';

@NgModule({
  imports: [
    CommonModule,
    ChessRoutingModule,
    AppMaterialModule,
    TranslateModule.forChild({})
  ],
  declarations: [
    ChessComponent
    // FramepanzoomDirective
  ]
})
export class ChessModule { }
