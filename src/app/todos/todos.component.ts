import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AddTodoComponent } from 'src/components/add-todo/add-todo.component';
import { ITodo } from 'src/interfaces/todo.interface';
import { AppState, selectAllTodos } from 'src/store';
import { TodoActions } from 'src/store/actions';
import { getAllTodos } from 'src/store/actions/todo.actions';

type TodoActions = "update"| "delete" | "edit";

@Component({
  selector: 'app-todos',
  template: `
    <div class="todos-container">
      <h2 class="app-main-title todo-title">To-Do Application</h2>
      <div>
        <button mat-fab  aria-label="Add  new todo" class="add-new-button" (click)="openDialog(todo)">
          <mat-icon>add</mat-icon>
        </button>
      </div>
        <todo-list-item [todos]="todos || []" (updateTodo)="handleTodoActions($event)"></todo-list-item>
        <div class="clear-todo" *ngIf="todos.length" (click)="clearAllCompleted()">Clear all completed</div>
    </div>
  `,
  styleUrls: ['./todos.component.scss']
})

export class TodosComponent implements OnInit {
  title = 'todo-app';
  todoSubscription$: Subscription;
  todos:ITodo[];
  todo:ITodo;

  constructor(
    private store: Store<AppState>,
    private _cd: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    this.resetTodo(); 
  }

  resetTodo(){
    this.todo = {
      id:0,
      name:'',
      active:true
    }
  }

  ngOnInit(): void {
    this.store.dispatch(getAllTodos());
    this.todoSubscription$ = this.store
      .select(selectAllTodos)
      .subscribe((data:ITodo[]) => {
        this.todos = data;
        // this._cd.detectChanges();
      }); 
  }

  handleTodoActions({item,action}:{item:ITodo,action:TodoActions}): void {
    if(action === "update"){
      this.store.dispatch(
        TodoActions.updateTodo({todo:item})
      );
    }else if(action === "delete"){
      this.store.dispatch(
        TodoActions.deleteTodo({id:item.id})
      );
    }else if(action === "edit"){
      this.openDialog(item);
    }
  }

  openDialog(data:ITodo): void {
    const dialogRef = this.dialog.open(AddTodoComponent, {
      minWidth:'80%',
      data:{...data},
    });
    dialogRef.afterClosed().subscribe((result:ITodo | null) => {
      if(result?.name){
        if(!!result.id){
          this.store.dispatch(
            TodoActions.updateTodo({todo:result})
          );
        }else{
          this.store.dispatch(
            TodoActions.addTodo({todo:result})
          );
        }
      }
    });
  }
  
  clearAllCompleted():void{
    this.store.dispatch(
      TodoActions.clearAllCompleted()
    );
  }

  ngOnDestroy() {
    this.todoSubscription$.unsubscribe();
  }
}
