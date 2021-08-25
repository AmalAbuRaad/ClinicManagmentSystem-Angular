import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, limit?:number) {
    if(limit == null)
      limit = 10;
      if(value != null && value.length > <number>limit)  
        return value.substring(0, limit) + '...';

    return value;
  }

}
