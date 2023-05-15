import { createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../core/core.state';
import { BlockedPhone } from './blocked-phone.model';


export const FORM_EXAMPLE_FEATURE_NAME = 'blockedPhone';

export const selectBlockedPhone = createFeatureSelector<
    AppState,
    BlockedPhoneState
>(FORM_EXAMPLE_FEATURE_NAME);

export interface BlockedPhoneState {
    blockedPhone: BlockedPhone[];
    /*
    blockedPhoneNumber: string,
    blockedPhoneForWho: string,
    blockedPhoneByWho: string,
    blockedPhoneDate: string,
    blockedPhoneDateLastModification: string,
    blockedPhoneLastCalled: string,
    blockedPhoneCallCount: number,
    blockedPhoneActive: boolean,
    */
}

export interface State extends AppState {
    [FORM_EXAMPLE_FEATURE_NAME] : BlockedPhoneState;
}