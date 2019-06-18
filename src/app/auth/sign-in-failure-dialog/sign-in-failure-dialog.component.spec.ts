import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '../../material/material.module';
import { SignInFailureDialogComponent } from './sign-in-failure-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('SignInFailureDialogComponent', () => {
  let component: SignInFailureDialogComponent;
  let fixture: ComponentFixture<SignInFailureDialogComponent>;
  const dialogRef = jasmine.createSpyObj(['close']);
  const dialogData = { error: 'error' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ SignInFailureDialogComponent ],
      providers: [{provide: MatDialogRef, useValue: dialogRef},
      {provide: MAT_DIALOG_DATA, useValue: dialogData}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInFailureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
