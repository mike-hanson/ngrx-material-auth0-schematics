import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../auth.reducer';
import { SignOutCompleteAction } from '../auth.actions';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new SignOutCompleteAction());
  }
}
