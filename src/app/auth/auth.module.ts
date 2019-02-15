import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { AuthRoutingModule } from './auth-routing.module';

const COMPONENTS = [SignInComponent, SignOutComponent];
@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  exports: COMPONENTS
})
export class AuthModule { }
