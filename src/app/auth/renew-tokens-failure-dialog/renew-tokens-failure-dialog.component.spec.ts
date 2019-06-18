import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '../../material/material.module';
import { RenewTokensFailureDialogComponent } from './renew-tokens-failure-dialog.component';

describe('RenewTokensFailureDialogComponent', () => {
  let component: RenewTokensFailureDialogComponent;
  let fixture: ComponentFixture<RenewTokensFailureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewTokensFailureDialogComponent ],
      imports: [MaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewTokensFailureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
