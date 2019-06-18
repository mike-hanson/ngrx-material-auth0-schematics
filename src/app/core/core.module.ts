import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from '../material/material.module';
import { AuthModule } from '../auth/auth.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ShellComponent } from './shell/shell.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { StoreModule } from '@ngrx/store';
import * as fromCore from './state/core.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CoreEffects } from './state/core.effects';

export const COMPONENTS = [
  ToolbarComponent,
  PageNotFoundComponent,
  HomeComponent,
  AboutComponent,
  SideNavComponent,
  ShellComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    LayoutModule,
    MaterialModule,
    CoreRoutingModule,
    AuthModule,
    StoreModule.forFeature('shell', fromCore.reducer),
    EffectsModule.forFeature([CoreEffects])
  ],
  exports: COMPONENTS
})
export class CoreModule { }
