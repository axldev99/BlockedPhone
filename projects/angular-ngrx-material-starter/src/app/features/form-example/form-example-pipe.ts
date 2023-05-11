import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyOneError'
})
export class OnlyOneErrorPipe implements PipeTransform {
    transform(errors: any, message1: string, message2: string): string {
      if (!errors) {
        return '';
      }
      
      if (errors.required) {
        return message1;
      }
      
      if (errors.startDateMissing || errors.endDateMissing) {
        return message2;
      }
      
      if (errors.endDateBeforeStartDate) {
        return 'End date cannot be earlier than start date';
      }
      
      return '';
    }
  }