import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select, } from '@ngrx/store';

import { State } from '../state/core.reducer';
import { ToggleSideNavAction } from '../state/core.actions';
import {
  getShowSideNav,
  getSideNavMode,
  getIsFixedInViewPort
} from '../state/core.selectors';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  public showSideNav$: Observable<boolean>;
  public sideNavMode$: Observable<string>;
  public isFixedInViewport$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.showSideNav$ = this.store.pipe(select(getShowSideNav));
    this.sideNavMode$ = this.store.pipe(select(getSideNavMode));
    this.isFixedInViewport$ = this.store.pipe(select(getIsFixedInViewPort));
  }

  public handleSideNavToggled(): void {
    this.sendToggleSideNavAction();
  }

  private sendToggleSideNavAction() {
    this.store.dispatch(new ToggleSideNavAction());
  }

}
