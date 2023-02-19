import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { ITodo } from 'src/interfaces/todo.interface';
type TodoActions = "update"| "delete" | "edit";

type TodoFilters = "all"| "completed" | "active";


@Component({
  selector: 'todo-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() todos: ITodo[];
  @Output() updateTodo = new EventEmitter<{item:ITodo,action:TodoActions}>();
  
  filters:TodoFilters[] = [
    "all", "completed", "active"
  ]
  currentFilter:TodoFilters = "all";
  constructor() {
    
  }
  
  ngOnInit(): void {
  }
  markAsDone = (item:ITodo)=>{
    this.updateTodo.emit({
      item:{...item,active:false},
      action:"update" 
    })
  }
  removeDone = (item:ITodo)=>{
    this.updateTodo.emit({
      item:{...item,active:true},
      action:"update" 
    })
  }

  editItem = (item:ITodo)=>{
    this.updateTodo.emit({
      item,
      action:"edit" 
    })
  }
  deleteItem = (item:ITodo)=>{
    this.updateTodo.emit({
      item,
      action:"delete" 
    })
  }
}
