import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from '../material/material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const COMPONENTS = [
  ToolbarComponent,
  PageNotFoundComponent,
  HomeComponent,
  AboutComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    MaterialModule,
    CoreRoutingModule,
  ],
  exports: COMPONENTS
})
export class CoreModule { }
