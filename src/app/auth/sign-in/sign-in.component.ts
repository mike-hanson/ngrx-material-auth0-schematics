import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '../auth.reducer';
import { SignInCompleteAction } from '../auth.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new SignInCompleteAction());
  }
}
