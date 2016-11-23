import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'level_indent'})
export class LevelIndentPipe implements PipeTransform {
    transform(value: string, level: string): any {
        let levelNumber = parseInt(level);
        var spaces: string = '';
        for (var i=0; i<levelNumber; i++)
        {
            if (i > 0)
            {
                spaces += '&nbsp;';
            }
        }
        return spaces.concat(value);
    }
}