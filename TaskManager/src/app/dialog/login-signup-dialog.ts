import { Component, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';

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
      width: '300px', disableClose: true,
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
  providers: [UserService]
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
    this.showingPassword = this.showingPassword? false : true;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  switchTo(path) {
    this.location.replaceState(path);
    this.thisRoute = path;
  }

  login() {
    this.userService.currentUser = {
      name: this.name,
      email: this.email,
      password: this.password
    }

    this.userService.isLoggedIn = true;

    this.closeDialog();
  }
}