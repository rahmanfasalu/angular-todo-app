import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name : 'filterResult',
})
export class FilterResult<T extends {active:boolean}> implements PipeTransform{
  public transform(value:T[], key: keyof T, term: "all" | "completed" | "active") {
    return value.filter((item:T) => {
            if(term === "all"){
                return true;
            }
            if(term === "completed"){
                return !item.active
            }
            if(term === "active"){
                return item.active
            }
        
      return true
    });
  }
}