import { state } from "@angular/animations";
import { createSelector } from "@ngrx/store";
import { BlockedPhoneState, selectBlockedPhone } from "./blocked-phone.state";

export const selectBlockedPhoneState = createSelector(
    selectBlockedPhone,
    (state: BlockedPhoneState) => { return state }
);

export const selectAllBlockedPhone = createSelector(
    selectBlockedPhoneState,
    (state) => { return state.blockedPhone }
);