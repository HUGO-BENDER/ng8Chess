import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// tslint:disable-next-line: max-line-length
import {MatSlideToggleModule, MatInputModule, MatStepperModule, MatTabsModule, MatButtonModule, MatTooltipModule, MatToolbarModule, MatMenuModule, MatIconModule, MatListModule, MatDialogModule,
  MatSidenavModule, MatGridListModule, MatCardModule, MatExpansionModule } from '@angular/material';

@NgModule({
    imports: [
      MatSlideToggleModule,
      MatInputModule,
      MatStepperModule,
      MatTabsModule,
      MatButtonModule,
      MatTooltipModule,
      MatToolbarModule,
      MatMenuModule,
      MatIconModule,
      MatListModule,
      MatDialogModule,
      MatSidenavModule,
      MatGridListModule,
      MatCardModule,
      MatExpansionModule
    ],
    exports: [
      MatSlideToggleModule,
      MatInputModule,
      MatStepperModule,
      MatTabsModule,
      MatButtonModule,
      MatTooltipModule,
      MatToolbarModule,
      MatMenuModule,
      MatIconModule,
      MatListModule,
      MatDialogModule,
      MatSidenavModule,
      MatGridListModule,
      MatCardModule,
      MatExpansionModule
    ],
    declarations: []
  })
  export class AppMaterialModule {}
