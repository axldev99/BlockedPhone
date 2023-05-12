import { createReducer, on } from '@ngrx/store';
import { FormExampleState } from './form-example.state';
import * as FormExampleAction from './form-example.action';

const initialState: FormExampleState = {
    user: {email: '', password: '', confirmPassword: ''}, 
    review: {city: '', dateStart: '', dateEnd: '', appreciation: '', comment: ''},
    page: 1,
};

export const formExampleReducer = createReducer(

    initialState,

    on(FormExampleAction.saveFormExampleSuccess, (state, {formExample, page}) => ({
        ...state,
        user: formExample.user, 
        review: formExample.review,
        page: page
    })),

    on(FormExampleAction.reset, (state, action) => ({
        ...state, 
        initialState
    })),

    on(FormExampleAction.goNext, (state, action) => ({
        ...state,
        page: action.page,
    })),

    on(FormExampleAction.goBack, (state, action) => ({
        ...state,
        page: action.page,
    }))
);

export const formExampleBaseReducer = (state:FormExampleState|undefined, action) => formExampleReducer(state, action);