import { createAction, props } from '@ngrx/store';
import { FormExample } from './form-example.model';


export const saveFormExample = createAction(
    "[FormExample] Save Form",
    props<{formExample: FormExample, page: number}>()
);

export const reset = createAction(
    "[FormExample] Reset"
);

export const goNext = createAction(
    "[FormExample] Go Next"
);

export const goBack = createAction(
    "[FormExample] Go Back"
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