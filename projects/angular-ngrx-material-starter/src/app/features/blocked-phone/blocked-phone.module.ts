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
import { MatDialogModule } from "@angular/material/dialog";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { blockedPhoneReducer } from './blocked-phone.reducer';
import { BlockedPhoneEffect } from './blocked-phone.effect';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
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
