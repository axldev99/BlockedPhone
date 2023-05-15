import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { BlockedPhone } from "./blocked-phone.model";




@Injectable()
export class BlockedPhoneService {

    constructor() {
    }

    saveFormExample(blockedPhone: BlockedPhone): Observable<BlockedPhone> {
      const obs = new Observable<BlockedPhone>(observer => {
        observer.next(blockedPhone);
        observer.complete();
      });

      return obs;
    }

}
