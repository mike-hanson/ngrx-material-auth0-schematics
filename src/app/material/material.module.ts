import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';

export const COMPONENTS = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})
export class MaterialModule { }
