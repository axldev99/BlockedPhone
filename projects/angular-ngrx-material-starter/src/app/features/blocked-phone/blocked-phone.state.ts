import { createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../core/core.state';
import { BlockedPhone } from './blocked-phone.model';


export const FORM_EXAMPLE_FEATURE_NAME = 'blockedPhone';

export const selectFormExample = createFeatureSelector<
    AppState,
    BlockedPhoneState
>(FORM_EXAMPLE_FEATURE_NAME);

export interface BlockedPhoneState {
    blockedPhone : BlockedPhone;
}

export interface State extends AppState {
    [FORM_EXAMPLE_FEATURE_NAME] : BlockedPhoneState;
}