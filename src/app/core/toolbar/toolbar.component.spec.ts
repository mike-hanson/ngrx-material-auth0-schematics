import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../../material/material.module';
import { AuthModule } from '../../auth/auth.module';
import { ToolbarComponent } from './toolbar.component';
import { environment } from '../../../environments/environment';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [
        RouterTestingModule,
        MaterialModule,
        AuthModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should provide title as property', () => {
    expect(component.appTitle).toEqual(environment.appTitle);
  });

  it('should define method to handle click on sub menu', () => {
    expect(typeof component.handleMenuClick).toBe('function', 'Method was not devied');
    expect(component.handleMenuClick.length).toBe(1, 'Method did not define correct number of parameters');
  });

  it('should deine output field for notification of menu click', () => {
    expect(component.menuToggled instanceof EventEmitter).toBe(true);
  });

  it('should emit event when menu toggled', () => {
    let wasRaised = false;
    component.menuToggled.subscribe(n => wasRaised = true);

    component.handleMenuClick(new Event('click'));

    expect(wasRaised).toBe(true);
  });

});
