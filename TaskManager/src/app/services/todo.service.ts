import { Injectable } from '@angular/core';
import { ToDo } from './../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoList:Array<ToDo> = [];
  readonly todoStatus = {DONE: 'done', PENDING:'pending', DOING:'doing'};
  
  constructor() { }

  getToDo(itemIndex?: number) {
    if(itemIndex) return this.todoList[itemIndex];
    else return this.todoList;
  }

  removeToDo(itemIndex?:number) {
    if(itemIndex) this.todoList.splice(itemIndex, 1);
    else this.todoList = [];
  }

  updateToDo(itemIndex:number, updatedToDo:ToDo) {
    this.todoList[itemIndex] = updatedToDo;
  }

  addToDo(newToDo:ToDo) {
    this.todoList.push(newToDo);
  }
}
