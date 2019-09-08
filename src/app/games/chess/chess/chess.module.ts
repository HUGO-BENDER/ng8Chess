import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChessRoutingModule } from './chess-routing.module';
import { ChessComponent } from '../chess/chess.component';

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
  ]
})
export class ChessModule { }
