/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { ITodo } from 'src/interfaces/todo.interface';
import { TodoActions } from '../actions';

/* Intialise State */
export const initialState: ITodo[] = [];

// todo reducer
export const todoReducer = createReducer(
  initialState,
  on(TodoActions.addTodoSuccess,  (state, { todo }) =>{
    return [{...todo,id:state.length + 1},...state]
  }),
  on(TodoActions.todoReset, state => ([])),
  on(TodoActions.updateTodoSuccess, (state, { todo }) => {
    return state.map((item)=>item.id === todo.id ? todo : item )
  }),
  on(TodoActions.getAllTodosSuccess, (state, { todos }) => {
    return [...todos];
  }),
  on(TodoActions.deleteTodoSuccess, (state, { id }) => {
    const updated = state.filter((item)=>item.id !== id);
    return [...updated];
  }),
  on(TodoActions.clearAllCompleted, (state) => {
    const updated = state.filter((item)=>item.active);
    return [...updated]
  }),
);
