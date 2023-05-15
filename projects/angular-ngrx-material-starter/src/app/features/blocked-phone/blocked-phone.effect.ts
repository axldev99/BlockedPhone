import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { blockedPhoneDeleteRequested, blockedPhoneDeleteSuccess, blockedPhoneRetrieveRequested, blockedPhoneRetrieveSuccess } from "./blocked-phone.action";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { BlockedPhoneService } from "./blocked-phone.service";
import { of } from "rxjs";

@Injectable()
export class BlockedPhoneEffect {

  retrieveBlockedPhone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(blockedPhoneRetrieveRequested),
      exhaustMap(action =>
        this.service.retrieveBlockedPhone().pipe(
          //Ajouter au localStorage ?
          map(blockedPhone => blockedPhoneRetrieveSuccess({ blockedPhone })),
          //catchError(error => of(blockedPhoneRetrieveFailure({ error })))
        )
      )
    )
  );

  deleteBlockedPhone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(blockedPhoneDeleteRequested),
        map(action => blockedPhoneDeleteSuccess({ blockedPhone: action.blockedPhone }))
    )
  );
   
  constructor(
    private actions$: Actions,
    private service: BlockedPhoneService
  ) {}
}