import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'wfmFilter'
})

export class FilterPipe implements PipeTransform {
  transform(items: any, value: string, field: string): any {
    if (!items.length || !value) {
      return items;
    } else {
      return items.filter((i) => {
        const t = Object.assign({}, i);

        if (!isNaN(t[field])) {
          t[field] += '';
        }
        if (field === 'type') {
          t[field] = t[field] === 'income' ? 'доход' : 'расход';
        }

        if (field === 'category') {
          field = 'catName';
        }
        return t[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
      });
    }
  }
}
