import { Component, OnInit, Input } from '@angular/core';
import { ToDo } from '../models/todo.model';

@Component({
  selector: 'todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent {
  @Input('todo') public todoData: ToDo;
}
