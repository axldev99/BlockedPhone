import { createAction, props } from '@ngrx/store';
import { BlockedPhone } from './blocked-phone.model';

  /*RETRIEVE*/
  export const blockedPhoneRetrieveRequested = createAction(
    '[Blocked Phone] Retrieve Requested',
    props<{ blockedPhone: BlockedPhone[] }>()
  );
  
  export const blockedPhoneRetrieveSuccess = createAction(
    '[Blocked Phone] Retrieve Success',
    props<{ blockedPhone: BlockedPhone[] }>()
  );
  
  export const blockedPhoneRetrieveError = createAction(
    '[Blocked Phone] Retrieve Error'
  );

  /*DELETE*/
  export const blockedPhoneDeleteRequested = createAction(
    '[Blocked Phone] Delete Requested',
    props<{ blockedPhone: BlockedPhone }>()
  );

  export const blockedPhoneDeleteSuccess = createAction(
    '[Blocked Phone] Delete Success',
    props<{ blockedPhone: BlockedPhone }>()
  );

  export const blockedPhoneDeleteError = createAction(
    '[Blocked Phone] Delete Error'
  );

  export const blockedPhoneAddRequested = createAction(
    '[Blocked Phone] Add Requested',
    props<{ blockedPhone: BlockedPhone }>()
  );

  export const blockedPhoneAddSuccess = createAction(
    '[Blocked Phone] Add Success',
    props<{ blockedPhone: BlockedPhone }>()
  );

  export const blockedPhoneAddError = createAction(
    '[Blocked Phone] Add Error'
  );

  export const blockedPhoneUpdateActiveStatusRequested = createAction(
    '[Blocked Phone] Update Requested',
    props<{ status: boolean, blockedPhone: BlockedPhone }>()
  );

  export const blockedPhoneUpdateActiveStatusSuccess = createAction(
    '[Blocked Phone] Update Success',
    props<{ status: boolean, blockedPhone: BlockedPhone }>()
  );

  export const blockedPhoneUpdateActiveStatusError = createAction(
    '[Blocked Phone] Update Error'
  );
