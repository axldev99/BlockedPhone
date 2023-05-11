import { createReducer, on } from '@ngrx/store';
import { FormExampleState } from './form-example.state';
import * as FormExampleAction from './form-example.action';

const initialState: FormExampleState = {
    formExample: null,
    page: 1,
    isAuthenticated: false
};

export const formExampleReducer = createReducer(

    initialState,

    on(FormExampleAction.saveFormExample, (state, action) => {
        console.log("SAVE FORM");
        return {
            formExample: action.formExample,
            page: action.page,
            isAuthenticated: state.isAuthenticated
        }
    }),

    on(FormExampleAction.reset, (state, action) => {
        console.log("Je reset");
        return initialState;
    }),

    on(FormExampleAction.goNext, (state, action) => {
        console.log("Je go next");
        return {
            formExample: state.formExample,
            page: 2,
            isAuthenticated: state.isAuthenticated
        }
    }),

    on(FormExampleAction.goBack, (state, action) => {
        console.log("Je go back");
        return {
            formExample: state.formExample,
            page: 1,
            isAuthenticated: state.isAuthenticated
        }
    })
);




export const formExampleBaseReducer = (state:FormExampleState|undefined, action) => formExampleReducer(state, action);
