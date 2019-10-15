import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// -- Shared
import { AppSharedModule } from '../../../shared-components/app-shared.module';

import { ChessRoutingModule } from './chess-routing.module';
import { ChessComponent } from '../chess/chess.component';

// --Translate
import { TranslateModule } from '@ngx-translate/core';
// --Material
import { AppMaterialModule } from '../../../components/app-material/app-material.module';

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    ChessRoutingModule,
    AppMaterialModule,
    TranslateModule.forChild({})
  ],
  declarations: [
    ChessComponent
  ]
})
export class ChessModule { }
