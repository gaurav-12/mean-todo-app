import { Injectable } from '@angular/core';
import { ToDo } from './../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoList:Array<ToDo> = [];
  readonly todoStatus = {DONE: 'done', PENDING:'pending', DOING:'doing'};
  
  constructor() {
    const sampleToDo = new ToDo();
    sampleToDo.title = "Dummy Title";
    sampleToDo.description = "Dummy Description";
    sampleToDo.createdOn = Date.now();
    sampleToDo.status = this.todoStatus.PENDING;

    this.todoList.push(sampleToDo);
  }

  getToDo(itemIndex: number) {
    return this.todoList[itemIndex];
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
