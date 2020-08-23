import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from './services/user.service';
import { TodoService } from './services/todo.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogEntryComponent, DialogOverviewDialog } from './dialog/login-signup-dialog';

@NgModule({
  declarations: [
    AppComponent,
    TodoListItemComponent,
    DialogEntryComponent,
    DialogOverviewDialog,
    HomeComponent,
  ],
  imports: [
  BrowserModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [UserService, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
