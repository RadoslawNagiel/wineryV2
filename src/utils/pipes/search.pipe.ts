/* eslint-disable require-unicode-regexp */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: `search`,
    standalone: true,
})
export class SearchPipe<T> implements PipeTransform {
    transform(array: T[], options: { search: string; param: string[] }): T[] {
        return array.filter((el: any) => options.param.find((param) => el[param].toLowerCase().includes(options.search.toLowerCase())));
    }
}
