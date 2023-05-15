import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { BlockedPhone } from "./blocked-phone.model";
import { HttpClient } from "@angular/common/http";




@Injectable()
export class BlockedPhoneService {

  private apiUrl = './assets/data.json'; // Remplacez par l'URL de votre fichier JSON

  constructor(private http: HttpClient) { }

  retrieveBlockedPhone(): Observable<BlockedPhone[]> {
    return this.http.get<BlockedPhone[]>(this.apiUrl);
  }
}
