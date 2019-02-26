import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, Store } from '@ngrx/store';

import { MaterialModule } from '../material/material.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { AuthButtonsComponent } from './auth-buttons/auth-buttons.component';
import { AuthRoutingModule } from './auth-routing.module';


import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { SignInFailureDialogComponent } from './sign-in-failure-dialog/sign-in-failure-dialog.component';
import { RenewTokensFailureDialogComponent } from './renew-tokens-failure-dialog/renew-tokens-failure-dialog.component';
import { reducer, State } from './auth.reducer';
import { RenewTokensAction, SilentSignInAction } from './auth.actions';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const COMPONENTS = [
  SignInComponent,
  SignOutComponent,
  AuthButtonsComponent,
  SignInFailureDialogComponent,
  RenewTokensFailureDialogComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    MaterialModule,
    NoopAnimationsModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: COMPONENTS,
  entryComponents: [
    SignInFailureDialogComponent,
    RenewTokensFailureDialogComponent
  ]
})
export class AuthModule {
  constructor(store: Store<State>) {
    store.dispatch(new SilentSignInAction());
  }
 }
