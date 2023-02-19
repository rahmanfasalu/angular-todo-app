import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ITodo } from 'src/interfaces/todo.interface';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {
  constructor(
    public dialogRef: MatDialogRef<AddTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITodo,
  ) {}
 
  onCancel(): void {
    this.dialogRef.close();
  } 
  onSubmit(): void {
    if(this.data.name){
      this.dialogRef.close(this.data);
    }
  }
}




