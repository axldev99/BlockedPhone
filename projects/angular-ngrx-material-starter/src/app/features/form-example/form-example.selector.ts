import { state } from "@angular/animations";
import { createSelector } from "@ngrx/store";
import { FormExampleState, selectFormExample } from "./form-example.state";


export const selectFormExampleState = createSelector(
    selectFormExample,
    (state: FormExampleState) => { return state } 
);

export const selectFormExamplePage = createSelector(
    selectFormExampleState,
    (state) => { return state.page } 
);