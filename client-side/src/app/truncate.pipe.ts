import { Pipe, PipeTransform } from '@angular/core'
import { AppConstant } from './app.constant';

@Pipe({ name: 'truncate', pure: false })
export class truncate implements PipeTransform {
    transform(value: any, args?: any) {
        if (value == undefined)
            return;

        return value.length > 20 ? value.substring(1, 20) + "..." : value;
    }
}