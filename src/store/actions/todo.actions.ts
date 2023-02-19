/* NgRx */
import { createAction, props } from '@ngrx/store';
import { ITodo } from 'src/interfaces/todo.interface';

export const addTodo = createAction(
  '[Todo] Add',
  props<{ todo: ITodo}>()
);

export const getAllTodos = createAction(
  '[Todo] Get',
);
export const getAllTodosSuccess = createAction(
  '[Todo] Get All success',
  props<{ todos: ITodo[]}>()
);

export const addTodoSuccess = createAction(
  '[Todo] Success',
  props<{ todo: ITodo}>()
);

export const updateTodo = createAction(
  '[Todo] Update',
  props<{ todo:ITodo }>()
);


export const updateTodoSuccess = createAction(
  '[Todo] Update Success',
  props<{ todo:ITodo }>()
);


export const deleteTodo = createAction(
  '[Todo] Delete',
  props<{ id:number }>()
);
export const deleteTodoSuccess = createAction(
  '[Todo] Delete done',
  props<{ id:number  }>()
);

export const clearAllCompleted = createAction(
  '[Todo] Delete Completed'
);

export const clearAllCompletedSuccess = createAction(
  '[Todo] Delete Completed Success'
);


export const todoReset = createAction('[Todo] reset');
