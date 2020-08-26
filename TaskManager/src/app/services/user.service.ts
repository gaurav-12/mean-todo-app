import { Injectable } from '@angular/core';
import { User } from './../models/user.model';
import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User = {
    _id: '',
    fullName: ''
  }

  isLoggedIn = false;

  constructor(private todoService: TodoService, private httpClient: HttpClient) {
    this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (this.isLoggedIn) todoService.getUsersToDos(this.isLoggedIn, this.currentUser._id);
  }

  async loginUser(email: String, password: String) {
    const queryParams = new URLSearchParams({
      email: email.toString(),
      password: password.toString()
    });
    await this.httpClient.get(environment.login + queryParams.toString(), {})
      .toPromise().then((result: User) => {
        this.currentUser = {
          _id: result._id,
          fullName: result.fullName
        }

        this.isLoggedIn = true;

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

        this.todoService.getUsersToDos(this.isLoggedIn, this.currentUser._id);
      }).catch(err => {
        console.log(err);
      });
  }

  async signupUser(name: String, email: String, password: String) {
    const queryParams = new URLSearchParams({
      fullName: name.toString(),
      email: email.toString(),
      password: password.toString()
    });
    await this.httpClient.post(environment.signup + queryParams.toString(), {})
      .toPromise().then((result: User) => {
        this.currentUser = {
          _id: result._id,
          fullName: name
        }

        this.isLoggedIn = true;

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      }).catch(err => {
        console.log(err);
      });
  }

  logoutUser() {
    this.currentUser = {
      _id: '',
      fullName: '',
      email: '',
      password: ''
    }

    this.isLoggedIn = false;
    this.todoService.removeToDo(true);

    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('currentUser', null);
  }
}
