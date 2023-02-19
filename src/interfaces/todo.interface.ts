export interface ITodo{
    id:number;
    name:string;
    active:boolean;
}


enum TodoActions{
  "update",
  "delete",
  "edit",
}
