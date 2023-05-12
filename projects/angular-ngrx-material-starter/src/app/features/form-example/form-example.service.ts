import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { FormExample } from "./form-example.model";




@Injectable()
export class FormExampleService {

    constructor() {
    }

    saveFormExample(formExample: FormExample): Observable<FormExample> {
      const obs = new Observable<FormExample>(observer => {
        observer.next(formExample);
        observer.complete();
      });

      return obs;
    }

}
