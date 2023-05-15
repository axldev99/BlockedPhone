import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockedPhoneRoutingModule } from './blocked-phone-routing.module';
import { BlockedPhoneUiComponent } from './components/blocked-phone-ui/blocked-phone-ui.component';
import { BlockedPhoneComponent } from './blocked-phone/blocked-phone.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { BlockedPhoneService } from './blocked-phone.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BlockedPhoneDeleteDialogComponent } from './components/blocked-phone-delete-dialog/blocked-phone-delete-dialog.component';
import { BlockedPhoneAddDialogComponent } from './components/blocked-phone-add-dialog/blocked-phone-add-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { blockedPhoneReducer } from './blocked-phone.reducer';
import { BlockedPhoneEffect } from './blocked-phone.effect';
@NgModule({
  declarations: [
    BlockedPhoneComponent,
    BlockedPhoneUiComponent,
    BlockedPhoneDeleteDialogComponent,
    BlockedPhoneAddDialogComponent,
  ],
  imports: [
    CommonModule,
    BlockedPhoneRoutingModule,
    MatGridListModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDialogModule,
    StoreModule.forFeature('blockedPhone', blockedPhoneReducer),
    EffectsModule.forFeature([BlockedPhoneEffect]),
  ],
  providers: [
    BlockedPhoneService
  ]
})
export class BlockedPhoneModule { 
  /*
  static forRoot(): ModuleWithProviders<BlockedPhoneModule> {
    return {
        ngModule: BlockedPhoneModule
    }
  }
  */
}
