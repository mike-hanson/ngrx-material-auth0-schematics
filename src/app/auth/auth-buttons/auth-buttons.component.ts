import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State, getIsAuthenticated, getFullName, getPicture } from '../auth.reducer';
import { SignInAction, SignOutAction } from '../auth.actions';

@Component({
  selector: 'app-auth-buttons',
  templateUrl: './auth-buttons.component.html',
  styleUrls: ['./auth-buttons.component.css']
})
export class AuthButtonsComponent implements OnInit {
  public isAuthenticated$: Observable<boolean>;
  public userFullName$: Observable<string>;
  public userPicture$: Observable<string>;

  constructor(private store: Store<State>) {  }

  ngOnInit() {
    this.isAuthenticated$ = this.store.pipe(select(getIsAuthenticated));
    this.userFullName$ = this.store.pipe(select(getFullName));
    this.userPicture$ = this.store.pipe(select(getPicture));
  }

  public signIn(): void {
    this.store.dispatch(new SignInAction());
  }

  public signOut(): void {
    this.store.dispatch(new SignOutAction());
  }
}
