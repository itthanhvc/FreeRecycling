import { Pipe, PipeTransform } from '@angular/core'
import { AppConstant } from './app.constant';

@Pipe({ name: 'displayFullState', pure: false })
export class displayFullState implements PipeTransform {
    transform(value: any, args?: any) {
        if (value == undefined)
            return;

        return AppConstant.abbrStates[value];
    }
}