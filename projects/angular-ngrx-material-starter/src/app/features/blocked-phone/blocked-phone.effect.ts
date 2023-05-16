import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as BlockedPhoneAction  from "./blocked-phone.action";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { BlockedPhoneService } from "./blocked-phone.service";
import { of } from "rxjs";

@Injectable()
export class BlockedPhoneEffect {

  retrieveBlockedPhone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlockedPhoneAction.blockedPhoneRetrieveRequested),
      exhaustMap(action =>
        this.service.retrieveBlockedPhone().pipe(
          //Ajouter au localStorage ?
          map(blockedPhone => BlockedPhoneAction.blockedPhoneRetrieveSuccess({ blockedPhone })),
          //catchError(error => of(blockedPhoneRetrieveFailure({ error })))
        )
      )
    )
  );

  deleteBlockedPhone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlockedPhoneAction.blockedPhoneDeleteRequested),
        map(action => BlockedPhoneAction.blockedPhoneDeleteSuccess({ blockedPhone: action.blockedPhone }))
    )
  );

  addBlockedPhone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlockedPhoneAction.blockedPhoneAddRequested),
        map(action => BlockedPhoneAction.blockedPhoneAddSuccess({ blockedPhone: action.blockedPhone }))
    )
  );
   
  constructor(
    private actions$: Actions,
    private service: BlockedPhoneService
  ) {}
}