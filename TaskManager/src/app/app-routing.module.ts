import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DialogEntryComponent } from './dialog/login-signup-dialog';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'login', component: DialogEntryComponent },
      { path: 'signup', component: DialogEntryComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
