import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AuthFailureDialogData } from '../models/auth-failure-dialog-data';

@Component({
  selector: 'app-sign-in-failure-dialog',
  templateUrl: './sign-in-failure-dialog.component.html',
  styleUrls: ['./sign-in-failure-dialog.component.css']
})
export class SignInFailureDialogComponent {
  constructor(public dialogRef: MatDialogRef<SignInFailureDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AuthFailureDialogData) {  }
}
