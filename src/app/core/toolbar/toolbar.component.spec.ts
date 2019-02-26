import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../../material/material.module';
import { AuthModule } from '../../auth/auth.module';
import { ToolbarComponent } from './toolbar.component';
import { environment } from '../../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';

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

  it('Should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should provide title as property', () => {
    expect(component.appTitle).toEqual(environment.appTitle);
  });
});
