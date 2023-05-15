import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormExampleRoutingModule } from './form-example-routing.module';
import { FormExampleComponent } from './form-example/form-example.component';
import { MyFirstFormExampleComponent } from './components/my-first-form-example/my-first-form-example.component';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { formExampleReducer } from './form-example.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FormExampleEffect } from './form-example.effect';
import { FormExampleService } from './form-example.service';
import { PasswordStrengthDirective } from './form-example.directive';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { OnlyOneErrorPipe } from './form-example-pipe';



@NgModule({
  declarations: [
    FormExampleComponent,
    MyFirstFormExampleComponent,
    PasswordStrengthDirective,
    OnlyOneErrorPipe
  ],
  imports: [
    CommonModule,
    FormExampleRoutingModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatSliderModule,
    StoreModule.forFeature('formExample', formExampleReducer),
    EffectsModule.forFeature([FormExampleEffect]),
  ],
  providers: [
    FormExampleService
  ]
})
export class FormExampleModule { 
    static forRoot(): ModuleWithProviders<FormExampleModule> {
      return {
          ngModule: FormExampleModule
      }
  }
}
