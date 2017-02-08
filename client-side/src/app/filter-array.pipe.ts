import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'filterArray', pure: false })
export class filterArray implements PipeTransform {
    transform(value: any[], args?: any) {
        if (value == undefined)
            return;
        if (args == undefined)
            return value;
        return value.filter(item => item.toLowerCase().match(args.toLowerCase()));
    }
}