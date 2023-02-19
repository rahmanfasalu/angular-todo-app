import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import { of, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { TodoActions } from '../actions';
import { ITodo } from 'src/interfaces/todo.interface';
import { LocalStorageService } from 'src/services/local-storage.service';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private localStorage: LocalStorageService,
  ) {}

  addTodo$ = createEffect(() => {
    return this.actions$.pipe(
      /*
        Only emit values after a second has passed between the last emission,
        throw away all other values
      */
      // debounce(() => timer(100)),
      ofType(TodoActions.addTodo),
      // tap(({todo}: {todo:Todo}) =>{
      //   console.log("todo",todo);
      // }),
      map(({todo}: {todo:ITodo}) =>{
        this.localStorage.storeOnLocalStorage(todo,!!todo.id);
        return TodoActions.addTodoSuccess({todo:todo})
      })
      )
    });

    updateTodo$ = createEffect(() => {
    return this.actions$.pipe(
      /*
        Only emit values after a second has passed between the last emission,
        throw away all other values
      */
      // debounce(() => timer(100)),
      ofType(TodoActions.updateTodo),
      // tap(({todo}: {todo:Todo}) =>{
      //   console.log("todo",todo);
      // }),
      map(({todo}: {todo:ITodo}) =>{
        this.localStorage.storeOnLocalStorage(todo,!!todo.id);
        return TodoActions.updateTodoSuccess({todo:todo})
      })
      )
    });

    getAllTodos$ = createEffect(() => {
      return this.actions$.pipe(
        /*
          Only emit values after a second has passed between the last emission,
          throw away all other values
        */
        // debounce(() => timer(100)),
        ofType(TodoActions.getAllTodos),
        // tap(({todo}: {todo:Todo}) =>{
        //   console.log("todo",todo);
        // }),
        map(()=>{
          const todos:ITodo[] =  this.localStorage.getTodoList();
          return TodoActions.getAllTodosSuccess({todos:todos});
        })
      )
    });

    deleteTodo$ = createEffect(() => {
      return this.actions$.pipe(
        /*
          Only emit values after a second has passed between the last emission,
          throw away all other values
        */
        // debounce(() => timer(100)),
        ofType(TodoActions.deleteTodo),
        // tap(({todo}: {todo:Todo}) =>{
        //   console.log("todo",todo);
        // }),
        map(({id}:{id:number})=>{
          this.localStorage.deleteTodo(id);
          return TodoActions.deleteTodoSuccess({id});
        })
      )
    });

     clearAllCompleted$ = createEffect(() => {
      return this.actions$.pipe(
        /*
          Only emit values after a second has passed between the last emission,
          throw away all other values
        */
        // debounce(() => timer(100)),
        ofType(TodoActions.clearAllCompleted),
        // tap(({todo}: {todo:Todo}) =>{
        //   console.log("todo",todo);
        // }),
        map(()=>{
          this.localStorage.clearAllCompleted();
          return TodoActions.clearAllCompletedSuccess();
        })
      )
    });
}

