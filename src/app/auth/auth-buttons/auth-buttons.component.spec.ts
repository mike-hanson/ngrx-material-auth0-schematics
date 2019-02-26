import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { AuthButtonsComponent } from './auth-buttons.component';
import { MaterialModule } from '../../material/material.module';
import { State } from '../auth.reducer';
import { SignInAction, SignOutAction } from '../auth.actions';

describe('AuthButtonsComponent', () => {
  let component: AuthButtonsComponent;
  let fixture: ComponentFixture<AuthButtonsComponent>;
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthButtonsComponent],
      imports: [
        MaterialModule,
        StoreModule.forRoot({})]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthButtonsComponent);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
  });

  it('Should compile', () => {
    expect(component).toBeTruthy();
  });

  it('Should implement a method to signIn', () => {
    expect(typeof component.signIn).toBe('function', 'Method was not defined');
    expect(component.signIn.length).toBe(0, 'Method does not define correct number of parameters');
  });

  it('Should implement a method to signOut', () => {
    expect(typeof component.signOut).toBe('function', 'Method was not defined');
    expect(component.signOut.length).toBe(0, 'Method does not define correct number of parameters');
  });

  it('Should dispatch sign in action on sign in', () => {
    spyOn(store, 'dispatch');
    component.signIn();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(SignInAction));
  });

  it('Should dispatch sign out action on sign out', () => {
    spyOn(store, 'dispatch');
    component.signOut();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(SignOutAction));
  });
});
