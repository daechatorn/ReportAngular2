import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'str_replacement'})
export class StringReplacementPipe implements PipeTransform {
    transform(value: string, find: string, replacement: string): any {
        return value.replace(new RegExp(find, 'g'), replacement);
    }
}