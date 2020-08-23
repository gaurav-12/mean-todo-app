import { Injectable } from '@angular/core';
import { User } from './../models/user.model';

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
  
  constructor() { }
}
