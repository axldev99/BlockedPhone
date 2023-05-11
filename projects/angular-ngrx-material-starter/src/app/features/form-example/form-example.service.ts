import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { FormExample } from "./form-example.model";




@Injectable()
export class FormExampleService {

    constructor() {
    }

    saveFormExample(email:string, password:string, confirmPassword:string, city:string, dateStart:string, dateEnd:string, appreciation: string, comment: string): Observable<FormExample> {
      console.log("SERVUCE SAVE");
      const form: FormExample = {user : {email, password, confirmPassword}, review: {city, dateStart, dateEnd, appreciation, comment}};
      const obs = new Observable<FormExample>(observer => {
        observer.next(form);
        observer.complete();
      });

      return obs;
    }

}
