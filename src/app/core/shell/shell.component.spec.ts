import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthModule } from '../../auth/auth.module';
import { MaterialModule } from '../../material/material.module';
import { CoreModule } from '../core.module';
import { ShellComponent } from './shell.component';
import { ToggleSideNavAction } from '../state/core.actions';
import { Observable } from 'rxjs';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        RouterTestingModule,
        MaterialModule,
        CoreModule,
        AuthModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should include a toolbar', () => {
    const childElement = debugElement.query(By.css('app-toolbar'));

    expect(childElement).toBeTruthy();
  });

  it('should include a side nav panel', () => {
    const childElement = debugElement.query(By.css('app-side-nav'));

    expect(childElement).toBeTruthy();
  });

  it('should include a router outlet', () => {
    const chileElement = debugElement.query(By.css('router-outlet'));

    expect(chileElement).toBeTruthy();
  });

  it('should implement an observable field to indicate whether side nav panel should be visible', () => {
    expect(component.showSideNav$ instanceof Observable).toBe(true);
  });

  it('should implement an observable field to indicate the side nav mode', () => {
    expect(component.sideNavMode$ instanceof Observable).toBe(true);
  });

  it('should implement an observable field to indicate whether the side nav is fixed to view port', () => {
    expect(component.isFixedInViewport$ instanceof Observable).toBe(true);
  });

  it('should implement a method to handle menu toggled notifications', () => {
    expect(typeof component.handleSideNavToggled).toBe('function', 'Method was not implemented');
    expect(component.handleSideNavToggled.length).toBe(0, 'Method does not implement correct number of parameters');
  });

  it('should dispatch menu toggled action on notification', () => {
    const store = TestBed.get(Store);
    spyOn(store, 'dispatch');

    component.handleSideNavToggled();

    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(ToggleSideNavAction));
  });
});
