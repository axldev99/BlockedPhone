import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockedPhoneRoutingModule } from './blocked-phone-routing.module';
import { BlockedPhoneUiComponent } from './components/blocked-phone-ui/blocked-phone-ui.component';
import { BlockedPhoneComponent } from './blocked-phone/blocked-phone.component';


@NgModule({
  declarations: [
    BlockedPhoneComponent,
    BlockedPhoneUiComponent
  ],
  imports: [
    CommonModule,
    BlockedPhoneRoutingModule
  ]
})
export class BlockedPhoneModule { }
