import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { UserService } from './services/user.service';
import { TodoService } from './services/todo.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { HomeComponent } from './home/home.component';
import { DialogEntryComponent, DialogOverviewDialog } from './dialog/login-signup-dialog';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

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
    MatIconModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UserService, TodoService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
