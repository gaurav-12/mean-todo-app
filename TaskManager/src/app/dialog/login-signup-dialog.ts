import { Component, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  template: ''
})
export class DialogEntryComponent {
  constructor(public dialog: MatDialog, private router: Router,
    private route: ActivatedRoute) {
    console.log('Opening...');
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewDialog, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}

@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog.html',
  styleUrls: ['dialog.css']
})
export class DialogOverviewDialog {
  constructor(public dialogRef: MatDialogRef<DialogOverviewDialog>,
    private router: Router, private location: Location) { }

  thisRoute = this.router.url;

  closeDialog() {
    this.dialogRef.close();
  }

  switchTo(path) {
    this.location.replaceState(path);
    this.thisRoute = path;
  }
}