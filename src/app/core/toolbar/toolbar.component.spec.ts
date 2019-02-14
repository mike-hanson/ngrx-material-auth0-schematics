import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '../../material/material.module';
import { ToolbarComponent } from './toolbar.component';
import { environment } from '../../../environments/environment';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [MaterialModule]
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

  it('Should implement a method to signIn', () => {
    expect(typeof component.signIn).toBe('function', 'Method was not defined');
    expect(component.signIn.length).toBe(0, 'Method does not define correct number of parameters');
  });

  it('Should implement a method to signOut', () => {
    expect(typeof component.signOut).toBe('function', 'Method was not defined');
    expect(component.signOut.length).toBe(0, 'Method does not define correct number of parameters');
  });
});
