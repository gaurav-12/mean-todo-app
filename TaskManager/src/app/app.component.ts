import { Component } from '@angular/core';
import { TodoService } from './services/todo.service';
import { ToDo } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaskManager';

  thisTitle = '';
  thisDescription = '';

  showMore = false;

  constructor(public todoService: TodoService) {}

  onSave() {
    const newToDo = new ToDo();
    newToDo.title = this.thisTitle;
    newToDo.description = this.thisDescription;
    newToDo.status = this.todoService.todoStatus.PENDING;
    this.todoService.addToDo(newToDo);

    this.thisTitle = "";
    this.thisDescription = "";
  }
}
