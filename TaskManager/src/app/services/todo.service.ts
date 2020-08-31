import { Injectable } from '@angular/core';
import { ToDo } from './../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoList: Array<ToDo> = [];
  readonly todoStatus = { DONE: 'done', PENDING: 'pending', DOING: 'doing' };

  constructor(private httpClient: HttpClient) {
    const newToDo: ToDo = {
      title: 'Some Dummy Title',
      description: 'Some Desctiption',
      status: this.todoStatus.PENDING,
      _id: '',
      createdOn: Date.now()
    }
    this.todoList.push(newToDo);
  }

  getToDo(itemIndex?: number) {
    return this.todoList[itemIndex];
  }

  getUsersToDos(isLoggedIn: Boolean, uid: String) {
    if (isLoggedIn) {
      this.httpClient.get(environment.getTodo + uid, {})
        .toPromise().then((todos: ToDo[]) => {
          this.todoList = todos;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  async removeToDo(logout?: Boolean, uid?: String, itemIndex?: number) {
    if (logout) {
      this.todoList = [];
    } else if (uid == '') {
      this.todoList.splice(itemIndex, 1);
    }
    else {
      const queryParams = new URLSearchParams({
        id: itemIndex == undefined ? '' : this.todoList[itemIndex]._id.toString(),
        index: itemIndex == undefined ? '-1' : itemIndex.toString(),
        uid: itemIndex == undefined ? '' : uid.toString(),
      });
      await this.httpClient.delete(environment.removeToDO + queryParams.toString(), {})
        .toPromise().then((result) => {
          if (itemIndex == undefined) this.todoList = [];
          else this.todoList.splice(itemIndex, 1);
        }).catch(err => {
          console.log(err);
        });
    }
  }

  async updateToDo(itemIndex: number, updatedToDo: ToDo) {
    const queryParams = new URLSearchParams({
      id: itemIndex == undefined ? '' : this.todoList[itemIndex]._id.toString(),
      title: updatedToDo.title.toString(),
      description: updatedToDo.description.toString(),
      status: updatedToDo.status.toString()
    });
    await this.httpClient.put(environment.updateToDo + queryParams.toString(), {})
      .toPromise().then(result => {
        this.todoList[itemIndex] = updatedToDo;
      }).catch(err => {
        console.log(err);
      });
  }

  async addToDo(newToDo: ToDo, uid: String) {
    if (uid === null) {
      this.todoList.push(newToDo);
    } else {
      const queryParams = new URLSearchParams({
        uid: uid.toString(),
        title: newToDo.title.toString(),
        description: newToDo.description.toString()
      });
      await this.httpClient.post(environment.addToDo + queryParams.toString(), {})
        .toPromise().then((result: ToDo) => {
          this.todoList.push(result);
        }).catch(err => {
          console.log(err);
        });
    }
  }
}
