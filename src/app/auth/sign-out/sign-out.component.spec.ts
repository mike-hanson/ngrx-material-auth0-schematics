import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { SignOutComponent } from './sign-out.component';
import { SignOutCompleteAction } from '../auth.actions';

describe('SignOutComponent', () => {
  let component: SignOutComponent;
  let fixture: ComponentFixture<SignOutComponent>;
  const storeMock = jasmine.createSpyObj(['dispatch']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignOutComponent],
      providers: [{ provide: Store, useValue: storeMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should use store to dispatch SignOutComplete action', () => {
    component.ngOnInit();

    expect(storeMock.dispatch).toHaveBeenCalledWith(jasmine.any(SignOutCompleteAction));
  });
});
