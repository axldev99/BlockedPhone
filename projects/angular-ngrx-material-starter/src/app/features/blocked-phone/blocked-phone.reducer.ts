import { createReducer, on } from '@ngrx/store';
import { BlockedPhoneState } from './blocked-phone.state';
import * as BlockedPhoneAction from './blocked-phone.action';

const initialState: BlockedPhoneState = {
    blockedPhone: null
};

export const blockedPhoneReducer = createReducer(

    initialState,

);

export const blockedPhoneBaseReducer = (state:BlockedPhoneState|undefined, action) => blockedPhoneReducer(state, action);