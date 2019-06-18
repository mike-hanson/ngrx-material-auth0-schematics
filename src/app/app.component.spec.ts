import { DebugElement } from '@angular/core';
import { Title, By } from '@angular/platform-browser';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from './material/material.module';
import { CoreModule } from './core/core.module';
import { AuthButtonsComponent } from './auth/auth-buttons/auth-buttons.component';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

describe('AppComponent', () => {
  let app: AppComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<AppComponent>;
  let titleService: Title;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        CoreModule,
        AuthModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        Title
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;
    app = debugElement.componentInstance;
    titleService = TestBed.get(Title);
  }));

  it('should compile', () => {
    expect(app).toBeTruthy();
  });

  it('should use service to set document title based on environment', () => {
    spyOn(titleService, 'setTitle').and.callThrough();

    app.ngOnInit();

    expect(titleService.setTitle).toHaveBeenCalledWith(environment.appTitle);
  });

  it('should include a shell', () => {
    const childElement = debugElement.query(By.css('app-shell'));

    expect(childElement).toBeTruthy();
  });
});
