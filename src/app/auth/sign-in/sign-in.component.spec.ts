import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { SignInComponent } from './sign-in.component';
import { SignInCompleteAction } from '../state/auth.actions';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  const storeMock = jasmine.createSpyObj(['dispatch']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignInComponent],
      providers: [{ provide: Store, useValue: storeMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should use store to dispatch SignInComplete action', () => {
    component.ngOnInit();

    expect(storeMock.dispatch).toHaveBeenCalledWith(jasmine.any(SignInCompleteAction));
  });
});
