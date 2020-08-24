import { Injectable } from '@angular/core';
import { User } from './../models/user.model';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User = {
    name: '',
    email: '',
    password: ''
  }

  isLoggedIn = false;

  constructor(private todoService: TodoService) { }

  loginUser(email: String, password: String) {
    this.currentUser = {
      name: 'Rick Sanchez',
      email: email,
      password: password
    }

    this.isLoggedIn = true;
  }
  
  signupUser(name: String, email: String, password: String) {
    this.currentUser = {
      name: name,
      email: email,
      password: password
    }

    this.isLoggedIn = true;
  }

  logoutUser() {
    this.currentUser = {
      name: '',
      email: '',
      password: ''
    }

    this.isLoggedIn = false;
    this.todoService.removeToDo();
  }
}
