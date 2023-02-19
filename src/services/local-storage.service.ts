import { Inject, Injectable } from '@angular/core';

import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ITodo } from 'src/interfaces/todo.interface';
// key that is used to access the data in local storageconst
const STORAGE_KEY = 'TODO_LIST';
@Injectable()
export class LocalStorageService {
  anotherTodolist = [];
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}

  public storeOnLocalStorage(todo:ITodo,update:boolean): void {
    // get array of tasks from local storage
    let currentTodoList = this.storage.get(STORAGE_KEY) || [];
    // push new task to array
    if(update){
        currentTodoList = currentTodoList.map((item:ITodo)=>item.id === todo.id ? todo : item);
    }else{
        currentTodoList.push({...todo,id:currentTodoList.length + 1});
    }
    // insert updated array to local storage
    this.storage.set(STORAGE_KEY, currentTodoList);
  }

  public getTodoList() {
    return this.storage.get(STORAGE_KEY) || [];
  }

  public deleteTodo(id:number) {
    let currentFavList = this.storage.get(STORAGE_KEY) || [];
    const updated = currentFavList.filter((item:ITodo)=>item.id !== id);
    this.storage.set(STORAGE_KEY, updated);
  }

  public clearAllCompleted() {
    let currentFavList = this.storage.get(STORAGE_KEY) || [];
    const updated = currentFavList.filter((item:ITodo)=>item.active);
    this.storage.set(STORAGE_KEY, updated);
  }
}
