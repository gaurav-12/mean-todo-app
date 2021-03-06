import { Component, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';

import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  template: '',
  providers: [UserService]
})
export class DialogEntryComponent {
  constructor(public dialog: MatDialog, private router: Router,
    private route: ActivatedRoute) {
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewDialog, {
      width: '300px', disableClose: true, panelClass: 'mat-dialog-custom-container', backdropClass: 'mat-dialog-custom-backdrop'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}

@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog.html',
  styleUrls: ['dialog.css'],
  animations: [
    trigger('overlayTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('250ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class DialogOverviewDialog {
  constructor(public dialogRef: MatDialogRef<DialogOverviewDialog>,
    private router: Router, private location: Location, public userService: UserService) { }

  thisRoute = this.router.url;
  email = '';
  name = '';
  password = '';
  confirmPassword = '';

  isLoading = false;

  showingPassword = false;
  toggleShowPassword() {
    this.showingPassword = this.showingPassword ? false : true;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  switchTo(path) {
    this.location.replaceState(path);
    this.thisRoute = path;
  }

  fieldsValid() {
    this.email = this.email.trim();
    this.password = this.password.trim();
    this.confirmPassword = this.confirmPassword.trim();
    this.name = this.name.trim();

    const passwordMatch = this.password.trim() === this.confirmPassword.trim();
    const emailPassValid = this.email.trim() !== "" && this.password.trim() !== "";

    if (this.thisRoute === '/login') return emailPassValid;
    else {
      return (this.name.trim() !== "") && emailPassValid && passwordMatch;
    }
  }

  async loginSignup() {
    if (this.fieldsValid()) {
      this.isLoading = true;
      try {
        const user: User = {
          fullName: this.name.trim(),
          email: this.email.trim(),
          password: this.password.trim()
        }

        if (this.thisRoute === '/login') {
          await this.userService.loginUser(user);
        } else {
          await this.userService.signupUser(user);
        }

        this.closeDialog();
      } catch (error) {
        console.log(error);
      }

      this.isLoading = false;
    }
  }
}