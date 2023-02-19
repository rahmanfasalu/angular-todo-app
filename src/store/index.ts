import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITodo } from 'src/interfaces/todo.interface';

import { todoReducer } from './reducer/todo.reducer';

export const reducers = {
  todos: todoReducer,
};

// Extends the app state to include the product feature.
export interface AppState {
  todos: ITodo[];
}
// Selector functions
const getTodoState = createFeatureSelector<AppState>(
  'todostate'
);

// Selector functions
const getTravelFeatureState = createFeatureSelector<any>(
  'todostate'
);
export const selectAllTodosSelector = (state: AppState) => state.todos;

// Category slice
export const selectAllTodos = createSelector(
  selectAllTodosSelector,
  (state: ITodo[]) => { 
    return state
  }
);


