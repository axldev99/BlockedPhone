import { createReducer, on } from '@ngrx/store';
import { BlockedPhoneState } from './blocked-phone.state';
import * as BlockedPhoneAction from './blocked-phone.action';
import { state } from '@angular/animations';
import { BlockedPhoneService } from './blocked-phone.service';
import { BlockedPhone } from './blocked-phone.model';

const initialState: BlockedPhoneState = {
    blockedPhone: 
    [{
        blockedPhoneNumber: '',
        blockedPhoneForWho: '',
        blockedPhoneByWho: '',
        blockedPhoneDate: '',
        blockedPhoneDateLastModification: '',
        blockedPhoneLastCalled: '',
        blockedPhoneCallCount: 0,
        blockedPhoneActive: false
    }]
};

export const blockedPhoneReducer = createReducer(

    initialState,

/*
    on(BlockedPhoneAction.blockedPhoneRetrieveRequested, (state, action) => ({
        ...state,
        blockedPhone: action.blockedPhone
        
    })),
*/
    on(BlockedPhoneAction.blockedPhoneRetrieveSuccess, (state, action) => ({
        ...state,
        blockedPhone: action.blockedPhone
    })),

    on(BlockedPhoneAction.blockedPhoneDeleteSuccess, (state, {blockedPhone}) => ({
        ...state,
        blockedPhone: state.blockedPhone.filter(bp => bp !== blockedPhone),
    })),

    on(BlockedPhoneAction.blockedPhoneAddSuccess, (state, {blockedPhone}) => ({
        ...state,
        blockedPhone: [...state.blockedPhone, blockedPhone]
    })),

    
);


export const blockedPhoneBaseReducer = (state:BlockedPhoneState|undefined, action) => blockedPhoneReducer(state, action);