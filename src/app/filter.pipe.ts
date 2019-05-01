import { Component,NgModule, Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: Array<any>, filter: string, filename: string): Array<any> {
        
        if(filter){        
            const f = filter.toLowerCase();
            return items.filter(
            item => item[filename].toLowerCase().indexOf(f) !== -1);
        }                 
        else {
            return items;
        }
    }
}