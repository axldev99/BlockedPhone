import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import * as FormExampleAction from './form-example.action';


@Injectable()
export class FormExampleEffect {

    saveFormExample$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(FormExampleAction.saveFormExampleRequested),
                    tap(action => localStorage.setItem('formExample', JSON.stringify(action.formExample))),
                    map(action => FormExampleAction.saveFormExampleSuccess({formExample: action.formExample, page: action.page})),  
                ),
            );

    reset$ = createEffect(() =>
    this.actions$
        .pipe(
            ofType(FormExampleAction.reset),
                tap
                (
                    action => resetLocalStorage()
                )
        ),{dispatch: false});


    goNext$ = createEffect(() =>
        this.actions$
        .pipe(
            ofType(FormExampleAction.goNext),
                tap
                (
                    action => updatePageState(action.page)
                )
        ),{dispatch: false});

    goBack$ = createEffect(() =>
        this.actions$
        .pipe(
            ofType(FormExampleAction.goBack),
                tap
                (
                    action => updatePageState(action.page)
                )
        ),{dispatch: false});

    constructor(private actions$: Actions, private router: Router) { }
    
}

function updatePageState(page : number){
    localStorage.setItem('page', page.toString());
}

function resetLocalStorage(){
    localStorage.clear();
}