import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatListModule
} from '@angular/material';

export const MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatListModule];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class MaterialModule { }
