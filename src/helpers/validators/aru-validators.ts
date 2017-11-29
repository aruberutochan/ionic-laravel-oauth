import {
  FormControl
} from '@angular/forms';

export class AruValidators {

  static fieldMatch(fieldName: string): any {
    return function (control: FormControl) {
      if (control.value === control.root.value[fieldName]) {
        return null;
      }else {
        return {
          'passwords do not match': true
        };
      }
    }
  }

  static fieldMatchCompared(fieldName: string): any {
    return function (control: FormControl) {
      if( control.root.value[fieldName] ){
        if(control.value === control.root.value[fieldName] ){
          return null;
        } else {
          return { 'passwords do not match': true };
        }
      }
    }
  }
}

