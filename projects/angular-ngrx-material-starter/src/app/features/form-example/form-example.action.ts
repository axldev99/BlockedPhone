import { createAction, props } from '@ngrx/store';
import { FormExample } from './form-example.model';


export const saveFormExampleRequested = createAction(
    "[FormExample] Save Form Requested",
    props<{formExample: FormExample, page: number}>()
);

export const saveFormExampleSuccess = createAction(
    "[FormExample] Save Form Succcess",
    props<{formExample: FormExample, page: number}>()
);

export const saveFormExampleFail = createAction(
    "[FormExample] Save Form Fail",
);


export const reset = createAction(
    "[FormExample] Reset"
);

export const goNext = createAction(
    "[FormExample] Go Next",
    props<{page: number}>()
);

export const goBack = createAction(
    "[FormExample] Go Back",
    props<{page: number}>()
);



/*
export const saveUser = createAction(
    "[Save Component] Save User",
    props<{user: User}>()
);

export const saveReview = createAction(
    "[Save Component] Save Review",
    props<{review: Review}>()
);
*/