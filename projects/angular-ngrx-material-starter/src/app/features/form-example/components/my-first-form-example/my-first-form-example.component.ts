import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Observable, concat, fromEvent, of } from 'rxjs';
import { skip, startWith, take } from 'rxjs/operators';
import { Condition, Review, User } from '../../form-example.model';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { createPasswordConfirmValidator, createPasswordStrenghtValidator, endDateBeforeStartDateValidator } from '../../form-example.validator';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/core.state';
import { FormExampleService } from '../../form-example.service';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { goNext, goBack, reset, saveFormExample } from '../../form-example.action';

@Component({
  selector: 'anms-my-first-form-example',
  templateUrl: './my-first-form-example.component.html',
  styleUrls: ['./my-first-form-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyFirstFormExampleComponent implements OnInit {

  /*Conditions*/
  containAtLeastEightChars = false;
  containAtLeastOneLowerCaseLetter = false;
  containAtLeastOneUpperCaseLetter = false;
  containAtLeastOneDigit = false;
  containAtLeastOneSpecialChar = false;

  /*Progress Bar*/
  numberOfValid = 0;
  color = 'warn';

  /*Form Observable*/
  conditions$: Observable<Condition[]>;
  conditionsInitiales$: Observable<Condition[]>;
  conditionsActuelles$: Observable<Condition[]>;
  page$: Observable<number>;
  appreciationError$: Observable<boolean>;
  filteredOptions: Observable<string[]>;
  
  /*Form Data*/
  user: User;
  review: Review;
  options: string[] = ['Montreal', 'Ottawa', 'Toronto'];
  appreciationValue: number;

  @ViewChild('password', { static: true }) input: ElementRef;

  hidePw = true;
  hidePwC = true;

  form1: FormGroup;
  form2: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>, private formExampleService: FormExampleService) {
   }
  
  ngOnInit() {
    //Initialiser LES CHAMPS FAUDRA TOUTE INITIALISER LES DATA

    const formExample = JSON.parse(localStorage.getItem("formExample")) ? localStorage.getItem("formExample") : null;
    this.page$ = of(JSON.parse(localStorage.getItem("page")) && parseInt(JSON.parse(localStorage.getItem("page"))) ? parseInt(JSON.parse(localStorage.getItem("page"))) : 1)
    //const isAuth = localStorage.getItem("isAuth");

    this.conditionsInitiales$ = this.ActualizeConditions();

    //Si le form est dans le local Storage, initialise les conditions et la barre de progression
    if(formExample){
      this.conditionsActuelles$ = this.validatePassword(JSON.parse(formExample).user.password);

      this.conditions$ = this.conditionsActuelles$.pipe(
         tap(conditions => this.calcStrenghtAndColor(conditions.filter(condition => condition.class == 'valid').length * (100/conditions.length))),
      );
      this.conditions$.subscribe({
        complete() {
          console.log("La barre et les conditions sont initialisées")
        }}
      );

      //Initialise le store à partir du localstorage

      this.saveFormExample(
        JSON.parse(formExample).user.email, 
        JSON.parse(formExample).user.password,
        JSON.parse(formExample).user.confirmPassword, 
        JSON.parse(formExample).review.city, 
        JSON.parse(formExample).review.dateStart, 
        JSON.parse(formExample).review.dateEnd, 
        JSON.parse(formExample).review.appreciation, 
        JSON.parse(formExample).review.comment, 
      );
      if(parseInt(JSON.parse(formExample).review.appreciation) != 0){
      console.log("setted");
        this.appreciationValue = parseInt(JSON.parse(formExample).review.appreciation);
      }
    }
    else{
      this.conditions$ = this.conditionsInitiales$;
    }
  
    this.form1 = this.fb.group({
      email: [formExample ? JSON.parse(formExample)?.user.email : '',{
        validators: [Validators.required, Validators.email],
      }],
      password: [formExample ? JSON.parse(formExample).user.password : '', {validators: 
        [
          Validators.required, 
          createPasswordStrenghtValidator(),
          createPasswordConfirmValidator('confirmPassword', true)
        ]}],
      confirmPassword: [formExample ? JSON.parse(formExample).user.password : '', {validators: 
        [
          Validators.required, 
          createPasswordConfirmValidator('password')
        ]}]
    }); 

    this.form2 = this.fb.group({
      city: [formExample ? JSON.parse(formExample).review.city : '', {validators: 
        [
          Validators.required
        ]}],
      dateStart: [formExample ? JSON.parse(formExample).review.dateStart : '', {validators: 
        [
          Validators.required
        ]}],
      dateEnd: [formExample ? JSON.parse(formExample).review.dateEnd : '', {validators: 
        [
          Validators.required
        ]}],
      appreciation: [formExample ? JSON.parse(formExample).review.appreciation: '', {validators: 
        [
          Validators.required
        ]}],
      comment: [formExample ? JSON.parse(formExample).review.comment : '', {validators: 
        [
          Validators.required
        ]}],
    }, { validator: endDateBeforeStartDateValidator() });
  }


  //Initie les observables password et conditionsActuelles
  //Initie le input city
  ngAfterViewInit() {
    const password$ = fromEvent<any>(this.input.nativeElement, 'keyup');
    this.conditionsActuelles$ = password$.pipe(
      map(event => event.target.value),
      distinctUntilChanged(),
      switchMap(password => this.validatePassword(password)),
      tap(conditions => this.calcStrenghtAndColor(conditions.filter(condition => condition.class == 'valid').length * (100/conditions.length))),
    );
    this.conditionClass();

    this.filteredOptions = this.form2.get('city').valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map(option => this._filter(option))
    );
  }

  //Filtre les options de la ville
  private _filter(option: string): string[] {
    if (!option) {
    return this.options;
  }
    const filterValue = option.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }
    return value;
  }

  //Actualize Conditions Observerable
  conditionClass() {
    this.conditions$ = concat(this.conditions$, this.conditionsActuelles$);
  }

  //Actualise la barre de progression
  calcStrenghtAndColor(numberOfValid: number) {
    this.numberOfValid = numberOfValid;
    if (numberOfValid <= 20) {
      this.color = "warn";
    } else if (numberOfValid > 20 && numberOfValid <= 99) {
      this.color = "accent";
    } else if (numberOfValid == 100) {
      this.color = "primary";
    }
  }

  //Actualise les conditions
  private ActualizeConditions(): Observable<Condition[]> {
    const conditions: Condition[] = [
      {name: 'containAtLeastEightChars', value: (this.containAtLeastEightChars == false) ? 'error' : 'check_circle', text: 'At least 8 characters', class: (this.containAtLeastEightChars == false) ? 'error' : 'valid'},
      {name: 'containAtLeastOneLowerCaseLetter', value: (this.containAtLeastOneLowerCaseLetter == false) ? 'error' : 'check_circle', text: 'At least one lowercase letter', class: (this.containAtLeastOneLowerCaseLetter == false) ? 'error' : 'valid'},
      {name: 'containAtLeastOneUpperCaseLetter', value: (this.containAtLeastOneUpperCaseLetter == false) ? 'error' : 'check_circle', text: 'At least one uppercase letter', class: (this.containAtLeastOneUpperCaseLetter == false) ? 'error' : 'valid'},
      {name: 'containAtLeastOneDigit', value: (this.containAtLeastOneDigit == false) ? 'error' : 'check_circle', text: 'At least one digit', class: (this.containAtLeastOneDigit == false) ? 'error' : 'valid'},
      {name: 'containAtLeastOneSpecialChar', value: (this.containAtLeastOneSpecialChar == false) ? 'error' : 'check_circle', text: 'At least one special character', class: (this.containAtLeastOneSpecialChar == false) ? 'error' : 'valid'},
    ];
    return of(conditions);
  }
  
  //Valide le mot de passe en fonction des tests et retourne actualiseConditions
  validatePassword(password: string): Observable<any[]> {
    this.containAtLeastEightChars = password.length >= 8;
    this.containAtLeastOneLowerCaseLetter = /[a-z]/.test(password);
    this.containAtLeastOneUpperCaseLetter = /[A-Z]/.test(password);
    this.containAtLeastOneDigit = /[0-9]/.test(password);
    this.containAtLeastOneSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    return this.ActualizeConditions();
  }

  //Va à la page suivante, actualise le state, localStorage et observable
  goNext(){
    this.store.dispatch(goNext());
    this.page$ = of(2);
  }

  goBack(){
    this.store.dispatch(goBack());
    this.page$ = of(1);
  }

  //Save le form comme il est
  save(){ 
      this.saveFormExample(this.form1.value.email, this.form1.value.password, this.form1.value.confirmPassword, 
        this.form2.value.city,this.form2.value.dateStart, this.form2.value.dateEnd,this.form2.value.appreciation,this.form2.value.comment,
      )
  }
  //Reset les champs, le state, le localStorage et les conditions et barre de progression
  reset() {
    //Reset les champs, le state et le localStorage
    this.form1.reset();
    this.form2.reset();

    this.appreciationValue = 0;
    this.store.dispatch(reset());

    //Reset les conditions et la barre de progression
    this.calcStrenghtAndColor(0);
    this.conditions$ = this.conditionsInitiales$;
    this.conditionClass();
  }

  submit(){
    this.save();
    alert('Form sent !');
  }

  
  saveFormExample(email, password, confirmPassword, city, dateStart, dateEnd, appreciation, comment){
    this.page$.pipe(
      take(1), // Prenez seulement la première valeur émise par page$
      switchMap(page => 
        this.formExampleService.saveFormExample(email, password, confirmPassword, city, dateStart, dateEnd, appreciation, comment)
          .pipe(
            tap(formExample => {
              this.store.dispatch(saveFormExample({formExample, page}));
            })
          )
      )
    ).subscribe(console.log);
  }

}
