import { Component } from '@angular/core';

import { TodoService } from '../services/todo.service';
import { ToDo } from '../models/todo.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  thisTitle = '';
  thisDescription = '';

  showMore = false;
  expandedIndex = -1;

  constructor(public todoService: TodoService, public userService: UserService) { }

  onSave() {
    const newToDo = new ToDo();
    newToDo.title = this.thisTitle;
    newToDo.description = this.thisDescription;
    newToDo.status = this.todoService.todoStatus.PENDING;
    this.todoService.addToDo(newToDo, this.userService.isLoggedIn ?
      this.userService.currentUser._id : null);

    this.thisTitle = "";
    this.thisDescription = "";
    this.showMore = false;
  }

  onStatusChange(index, newStatus) {
    const updatedToDo = this.todoService.getToDo(index);
    updatedToDo.status = newStatus;
    this.todoService.updateToDo(index, updatedToDo);
  }

  onRemoveToDo(index) {
    this.todoService.removeToDo(false, this.userService.currentUser._id, index);
  }
}
