import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockedPhoneComponent } from './blocked-phone/blocked-phone.component';

const routes: Routes = [
  {
    path: '',
    component: BlockedPhoneComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockedPhoneRoutingModule { }
