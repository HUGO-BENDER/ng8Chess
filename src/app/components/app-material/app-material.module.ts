import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
import {MatSlideToggleModule, MatInputModule, MatStepperModule, MatTabsModule, MatButtonModule, MatTooltipModule, MatToolbarModule, MatMenuModule, MatIconModule, MatListModule, MatDialogModule,
  MatSidenavModule, MatGridListModule, MatCardModule, MatExpansionModule, MatSelectModule } from '@angular/material';

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
      MatExpansionModule,
      MatSelectModule
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
      MatExpansionModule,
      MatSelectModule
    ],
    declarations: []
  })
  export class AppMaterialModule {}
